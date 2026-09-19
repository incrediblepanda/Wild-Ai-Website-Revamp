import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }
    const token = authHeader.replace("Bearer ", "");

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: claims, error: claimsErr } = await userClient.auth.getClaims(token);
    if (claimsErr || !claims?.claims) return json({ error: "Unauthorized" }, 401);
    const userId = claims.claims.sub as string;

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", userId);
    const isAdmin = (roles || []).some((r: any) => r.role === "admin" || r.role === "super_admin");
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    const body = await req.json();
    const subject = String(body.subject || "").trim();
    const html = String(body.html || "");
    const testTo = typeof body.test_to === "string" ? body.test_to.trim() : "";
    const isTest = !!testTo;
    const ids: string[] = Array.isArray(body.attendee_ids) ? body.attendee_ids : [];
    if (!subject || !html) return json({ error: "Missing fields" }, 400);
    if (!isTest && ids.length === 0) return json({ error: "Missing fields" }, 400);
    if (subject.length > 500 || html.length > 500_000 || ids.length > 5000) return json({ error: "Payload too large" }, 400);

    const attendees = isTest
      ? [{ id: null as any, name: "Test", email: testTo }]
      : (await admin.from("attendees").select("id, name, email").in("id", ids)).data || [];

    // Pull the next upcoming event to fill personalization tokens
    const today = new Date().toISOString().slice(0, 10);
    const { data: evRows } = await admin
      .from("events")
      .select("event_date, location, start_time, end_time, speakers")
      .gte("event_date", today)
      .order("event_date", { ascending: true })
      .limit(1);
    const ev = evRows?.[0];
    const fmtDate = (ymd: string) => {
      const [y, m, d] = ymd.split("-").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    };
    const fmtTime = (t?: string | null) => {
      if (!t) return "";
      const [h, m] = t.split(":").map(Number);
      const ampm = h >= 12 ? "PM" : "AM";
      const hh = ((h + 11) % 12) + 1;
      return `${hh}:${String(m).padStart(2, "0")} ${ampm}`;
    };
    const vars: Record<string, string> = ev ? {
      event_date: ev.event_date,
      event_date_long: fmtDate(ev.event_date),
      event_location: ev.location || "TBD",
      event_start_time: fmtTime(ev.start_time),
      event_end_time: fmtTime(ev.end_time),
      event_time_range: `${fmtTime(ev.start_time)}${ev.end_time ? " – " + fmtTime(ev.end_time) : ""}`,
      event_speakers: ev.speakers || "TBA",
    } : {};
    const render = (s: string) => s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
    const renderedSubject = isTest ? `[TEST] ${render(subject)}` : render(subject);
    const renderedHtml = render(html);

    let campaign: any = null;
    if (!isTest) {
      const { data, error: cErr } = await admin
        .from("email_campaigns")
        .insert({
          subject, html, sent_by: userId,
          recipient_count: attendees?.length || 0,
        })
        .select().single();
      if (cErr) throw cErr;
      campaign = data;
    }

    const POSTMARK_TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN");
    const POSTMARK_FROM = Deno.env.get("POSTMARK_FROM_EMAIL");
    const POSTMARK_STREAM = Deno.env.get("POSTMARK_MESSAGE_STREAM") || "broadcast";
    if (!POSTMARK_TOKEN) return json({ error: "POSTMARK_SERVER_TOKEN not configured" }, 500);
    if (!POSTMARK_FROM) return json({ error: "POSTMARK_FROM_EMAIL not configured (must be a verified Postmark sender)" }, 500);

    let success = 0, errors = 0;
    const sends: any[] = [];

    for (const a of attendees || []) {
      try {
        const r = await fetch("https://api.postmarkapp.com/email", {
          method: "POST",
          headers: {
            "X-Postmark-Server-Token": POSTMARK_TOKEN,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            From: POSTMARK_FROM,
            To: a.email,
            Subject: renderedSubject,
            HtmlBody: renderedHtml,
            MessageStream: POSTMARK_STREAM,
          }),
        });
        if (r.ok) {
          success++;
          if (!isTest) sends.push({ campaign_id: campaign.id, attendee_id: a.id, email: a.email, status: "sent" });
        } else {
          errors++;
          const text = await r.text();
          if (!isTest) sends.push({ campaign_id: campaign.id, attendee_id: a.id, email: a.email, status: "failed", error: text.slice(0, 500) });
          else console.error("Postmark error", text);
        }
      } catch (e: any) {
        errors++;
        if (!isTest) sends.push({ campaign_id: campaign.id, attendee_id: a.id, email: a.email, status: "failed", error: String(e).slice(0, 500) });
      }
    }

    if (!isTest && campaign) {
      await admin.from("email_sends").insert(sends);
      await admin.from("email_campaigns").update({ success_count: success, error_count: errors }).eq("id", campaign.id);
    }

    return json({ ok: success > 0, test: isTest, to: isTest ? testTo : undefined, success_count: success, error_count: errors, recipient_count: attendees?.length || 0 });
  } catch (e: any) {
    console.error("send-marketing-email error", e);
    return json({ error: e?.message || "Server error" }, 500);
  }
});

function json(body: any, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
