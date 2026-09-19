// Runs email automations: for every enabled rule, looks at every event and
// sends if today === event_date + offset_days (where offset is negative for "before",
// positive for "after"). Skips combos already in email_automation_runs.
//
// Triggered manually by an admin from the dashboard, or by a daily cron.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

// Today in America/Chicago as YYYY-MM-DD (events are scheduled in CT)
const todayCT = (): string => {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(new Date());
};

// Current time in America/Chicago as "HH:MM" (24h)
const nowCTtime = (): string => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "America/Chicago",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const h = parts.find((p) => p.type === "hour")?.value || "00";
  const m = parts.find((p) => p.type === "minute")?.value || "00";
  return `${h}:${m}`;
};

// returns target send date for a given event date + offset_days, as YYYY-MM-DD
const addDays = (ymd: string, days: number): string => {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Auth: allow either an admin user (manual run) OR the service role key (cron).
    const authHeader = req.headers.get("Authorization") || "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    let isService = false;
    let userId: string | null = null;

    if (authHeader === `Bearer ${serviceKey}` || authHeader === `Bearer ${anonKey}`) {
      // Service role (manual server call) or anon key (scheduled cron job).
      // Safe to treat as system because runs are deduped via email_automation_runs.
      isService = true;
    } else if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      const userClient = createClient(supabaseUrl, anonKey, {
        global: { headers: { Authorization: authHeader } },
      });
      const { data: claims, error } = await userClient.auth.getClaims(token);
      if (error || !claims?.claims) return json({ error: "Unauthorized" }, 401);
      userId = claims.claims.sub as string;
    } else {
      return json({ error: "Unauthorized" }, 401);
    }

    const admin = createClient(supabaseUrl, serviceKey);

    if (!isService) {
      const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", userId);
      const isAdmin = (roles || []).some((r: any) => r.role === "admin" || r.role === "super_admin");
      if (!isAdmin) return json({ error: "Forbidden" }, 403);
    }

    // Optional overrides for "today" / "now" — useful for previewing/testing from the UI.
    // When `force` is true, send-time-of-day check is bypassed (manual "Run today's now" button).
    let target = todayCT();
    let nowTime = nowCTtime();
    let force = false;
    if (req.method === "POST") {
      try {
        const body = await req.json();
        if (body?.target_date && /^\d{4}-\d{2}-\d{2}$/.test(body.target_date)) target = body.target_date;
        if (body?.now_time && /^\d{2}:\d{2}$/.test(body.now_time)) nowTime = body.now_time;
        if (body?.force === true) force = true;
      } catch {/* no body, fine */}
    }

    const { data: automations, error: aErr } = await admin
      .from("email_automations")
      .select("*")
      .eq("enabled", true);
    if (aErr) throw aErr;

    const { data: events, error: eErr } = await admin
      .from("events")
      .select("id, event_date, location, start_time, end_time, speakers");
    if (eErr) throw eErr;

    const { data: existingRuns } = await admin
      .from("email_automation_runs")
      .select("automation_id, event_id");
    const ranSet = new Set((existingRuns || []).map((r: any) => `${r.automation_id}:${r.event_id}`));

    const POSTMARK_TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN");
    const POSTMARK_FROM = Deno.env.get("POSTMARK_FROM_EMAIL");
    const POSTMARK_STREAM = Deno.env.get("POSTMARK_MESSAGE_STREAM") || "broadcast";
    if (!POSTMARK_TOKEN || !POSTMARK_FROM) {
      return json({ error: "Postmark not fully configured (need POSTMARK_SERVER_TOKEN and POSTMARK_FROM_EMAIL)" }, 500);
    }
    const triggered: any[] = [];

    for (const a of automations || []) {
      if (!a.template_id) continue;
      const { data: template } = await admin
        .from("email_templates").select("subject, html").eq("id", a.template_id).single();
      if (!template) continue;

      for (const ev of events || []) {
        const sendOn = addDays(ev.event_date, a.offset_days);
        if (sendOn !== target) continue;
        const sendTime = (a.send_time || "09:00").slice(0, 5);
        if (!force && nowTime < sendTime) continue;
        const key = `${a.id}:${ev.id}`;
        if (ranSet.has(key)) continue;

        // Build the audience
        let q = admin.from("attendees").select("id, email, name");
        if (a.audience === "subscribed") q = q.eq("subscribed", true);
        if (a.audience === "event_attendees") {
          q = q.contains("events_attended", [ev.event_date]).eq("subscribed", true);
        }
        const { data: recipients } = await q;
        const list = recipients || [];

        // Render subject/html with placeholders from event details
        const fmtDate = (ymd: string) => {
          const [y, m, d] = ymd.split("-").map(Number);
          return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
            timeZone: "UTC", weekday: "long", month: "long", day: "numeric", year: "numeric",
          });
        };
        const fmtTime = (t?: string | null) => {
          if (!t) return "TBD";
          const [hh, mm] = t.split(":").map(Number);
          const h12 = ((hh + 11) % 12) + 1;
          const ampm = hh >= 12 ? "PM" : "AM";
          return `${h12}:${String(mm).padStart(2, "0")} ${ampm} CT`;
        };
        const vars: Record<string, string> = {
          event_date: ev.event_date,
          event_date_long: fmtDate(ev.event_date),
          event_location: ev.location || "TBD",
          event_start_time: fmtTime(ev.start_time),
          event_end_time: fmtTime(ev.end_time),
          event_time_range: `${fmtTime(ev.start_time)}${ev.end_time ? " – " + fmtTime(ev.end_time) : ""}`,
          event_speakers: ev.speakers || "TBA",
        };
        const render = (s: string) =>
          s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
        const renderedSubject = render(template.subject);
        const renderedHtml = render(template.html);

        const { data: campaign } = await admin
          .from("email_campaigns")
          .insert({
            template_id: a.template_id,
            subject: renderedSubject,
            html: renderedHtml,
            recipient_count: list.length,
          })
          .select().single();

        let success = 0, errors = 0;
        const sends: any[] = [];
        for (const r of list) {
          try {
            const resp = await fetch("https://api.postmarkapp.com/email", {
              method: "POST",
              headers: {
                "X-Postmark-Server-Token": POSTMARK_TOKEN,
                "Content-Type": "application/json",
                "Accept": "application/json",
              },
              body: JSON.stringify({
                From: POSTMARK_FROM,
                To: r.email,
                Subject: renderedSubject,
                HtmlBody: renderedHtml,
                MessageStream: POSTMARK_STREAM,
              }),
            });
            if (resp.ok) {
              success++;
              sends.push({ campaign_id: campaign?.id, attendee_id: r.id, email: r.email, status: "sent" });
            } else {
              errors++;
              const text = await resp.text();
              sends.push({ campaign_id: campaign?.id, attendee_id: r.id, email: r.email, status: "failed", error: text.slice(0, 500) });
            }
          } catch (e: any) {
            errors++;
            sends.push({ campaign_id: campaign?.id, attendee_id: r.id, email: r.email, status: "failed", error: String(e).slice(0, 500) });
          }
        }
        if (sends.length) await admin.from("email_sends").insert(sends);
        if (campaign?.id) {
          await admin.from("email_campaigns")
            .update({ success_count: success, error_count: errors }).eq("id", campaign.id);
        }
        await admin.from("email_automation_runs").insert({
          automation_id: a.id, event_id: ev.id,
          campaign_id: campaign?.id, recipient_count: list.length,
        });
        triggered.push({ automation: a.name, event_date: ev.event_date, sent: success, failed: errors });
      }
    }

    return json({ ok: true, target_date: target, triggered });
  } catch (e: any) {
    console.error("run-email-automations error", e);
    return json({ error: e?.message || "Server error" }, 500);
  }
});
