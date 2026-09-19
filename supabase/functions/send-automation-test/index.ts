import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

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
const todayCT = () => new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
}).format(new Date());

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const svc = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: claims, error: cErr } = await userClient.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (cErr || !claims?.claims) return json({ error: "Unauthorized" }, 401);
    const userId = claims.claims.sub as string;

    const admin = createClient(url, svc);
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", userId);
    if (!(roles || []).some((r: any) => r.role === "admin" || r.role === "super_admin")) {
      return json({ error: "Forbidden" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const automationId = String(body?.automation_id || "");
    const to = String(body?.to || "").trim();
    if (!automationId) return json({ error: "automation_id required" }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return json({ error: "Valid 'to' required" }, 400);

    const { data: automation } = await admin
      .from("email_automations").select("*").eq("id", automationId).single();
    if (!automation?.template_id) return json({ error: "Automation has no template" }, 400);

    const { data: template } = await admin
      .from("email_templates").select("subject, html").eq("id", automation.template_id).single();
    if (!template) return json({ error: "Template not found" }, 404);

    const today = todayCT();
    const { data: upcoming } = await admin.from("events")
      .select("event_date, location, start_time, end_time, speakers")
      .gte("event_date", today).order("event_date", { ascending: true }).limit(1);
    let ev: any = upcoming?.[0];
    if (!ev) {
      const { data: anyEv } = await admin.from("events")
        .select("event_date, location, start_time, end_time, speakers")
        .order("event_date", { ascending: false }).limit(1);
      ev = anyEv?.[0];
    }
    // Fallback so the test always sends, even with an empty events table
    if (!ev) {
      ev = {
        event_date: today,
        location: "Sample Venue (no events in DB)",
        start_time: "18:00",
        end_time: "20:00",
        speakers: "TBA",
      };
    }

    const vars: Record<string, string> = {
      event_date: ev.event_date,
      event_date_long: fmtDate(ev.event_date),
      event_location: ev.location || "TBD",
      event_start_time: fmtTime(ev.start_time),
      event_end_time: fmtTime(ev.end_time),
      event_time_range: `${fmtTime(ev.start_time)}${ev.end_time ? " – " + fmtTime(ev.end_time) : ""}`,
      event_speakers: ev.speakers || "TBA",
    };
    const render = (s: string) => s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`);
    const subject = `[TEST] ${render(template.subject)}`;
    const html = render(template.html);

    const TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN");
    const FROM = Deno.env.get("POSTMARK_FROM_EMAIL");
    const STREAM = Deno.env.get("POSTMARK_MESSAGE_STREAM") || "broadcast";
    if (!TOKEN || !FROM) return json({ error: "Postmark not configured" }, 500);

    const resp = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "X-Postmark-Server-Token": TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        From: FROM, To: to, Subject: subject, HtmlBody: html,
        MessageStream: STREAM,
      }),
    });
    const data = await resp.json().catch(() => ({}));
    return json({ ok: resp.ok, status: resp.status, postmark: data, to, from: FROM, event_date: ev.event_date });
  } catch (e: any) {
    console.error("send-automation-test error", e);
    return json({ error: e?.message || "Server error" }, 500);
  }
});
