import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") || "";
    if (!authHeader.startsWith("Bearer ")) return json({ error: "Unauthorized" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, { global: { headers: { Authorization: authHeader } } });
    const { data: claims, error: claimsErr } = await userClient.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (claimsErr || !claims?.claims) return json({ error: "Unauthorized" }, 401);
    const userId = claims.claims.sub as string;
    const userEmail = (claims.claims.email as string) || "";

    const admin = createClient(supabaseUrl, serviceKey);
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", userId);
    const isAdmin = (roles || []).some((r: any) => r.role === "admin" || r.role === "super_admin");
    if (!isAdmin) return json({ error: "Forbidden" }, 403);

    let to = userEmail;
    let subject = "Wild AI · Postmark test";
    if (req.method === "POST") {
      try {
        const body = await req.json();
        if (body?.to && typeof body.to === "string") to = body.to.trim();
        if (body?.subject && typeof body.subject === "string") subject = body.subject.trim();
      } catch { /* ignore */ }
    }
    if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return json({ error: "Invalid recipient email" }, 400);

    const TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN");
    const FROM = Deno.env.get("POSTMARK_FROM_EMAIL");
    const STREAM = Deno.env.get("POSTMARK_MESSAGE_STREAM") || "broadcast";
    if (!TOKEN) return json({ error: "POSTMARK_SERVER_TOKEN not configured" }, 500);
    if (!FROM) return json({ error: "POSTMARK_FROM_EMAIL not configured" }, 500);

    const html = `<!doctype html><html><body style="font-family:Helvetica,Arial,sans-serif;background:#0a0e0c;color:#e8f5ee;padding:32px;">
      <h2 style="color:#5eead4;font-family:'Courier New',monospace;letter-spacing:1px;">// POSTMARK TEST</h2>
      <p>If you can read this, Postmark is wired up correctly.</p>
      <p style="color:#5eead4;font-family:'Courier New',monospace;font-size:12px;">From: ${FROM} · Stream: ${STREAM}</p>
      <p style="color:#a7c4b5;font-size:12px;">Sent at ${new Date().toISOString()}</p>
    </body></html>`;

    const resp = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        "X-Postmark-Server-Token": TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        From: FROM,
        To: to,
        Subject: subject,
        HtmlBody: html,
        TextBody: "Postmark is wired up correctly.",
        MessageStream: STREAM,
      }),
    });

    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) {
      return json({ ok: false, status: resp.status, postmark: data, from: FROM, to, stream: STREAM }, 200);
    }
    return json({ ok: true, status: resp.status, postmark: data, from: FROM, to, stream: STREAM });
  } catch (e: any) {
    console.error("send-test-postmark error", e);
    return json({ error: e?.message || "Server error" }, 500);
  }
});
