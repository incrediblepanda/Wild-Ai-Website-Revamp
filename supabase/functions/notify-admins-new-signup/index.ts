import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    const { user_id } = await req.json();
    if (!user_id || typeof user_id !== "string") {
      return new Response(JSON.stringify({ error: "user_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Look up the new user's profile
    const { data: profile } = await admin
      .from("profiles")
      .select("email, display_name")
      .eq("user_id", user_id)
      .maybeSingle();

    if (!profile?.email) {
      return new Response(JSON.stringify({ ok: true, skipped: "no profile" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Skip if this user is already an admin (shouldn't happen on signup, but safe)
    const { data: existingRoles } = await admin
      .from("user_roles").select("role").eq("user_id", user_id);
    if (existingRoles && existingRoles.length > 0) {
      return new Response(JSON.stringify({ ok: true, skipped: "already has role" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get admin emails
    const { data: roles } = await admin
      .from("user_roles").select("user_id").in("role", ["admin", "super_admin"]);
    const userIds = (roles || []).map((r: any) => r.user_id);
    let adminEmails: string[] = [];
    if (userIds.length) {
      const { data: profs } = await admin
        .from("profiles").select("email").in("user_id", userIds);
      adminEmails = (profs || []).map((p: any) => p.email).filter(Boolean);
    }
    if (!adminEmails.length) {
      return new Response(JSON.stringify({ ok: true, skipped: "no admins" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN");
    const FROM = Deno.env.get("POSTMARK_FROM_EMAIL");
    const STREAM = Deno.env.get("POSTMARK_MESSAGE_STREAM") || "broadcast";

    if (!TOKEN || !FROM) {
      return new Response(JSON.stringify({ error: "Email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminUrl = "https://wildai.us/admin";
    const html = `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0F172A;">
        <h2>New Wild AI signup pending admin approval</h2>
        <p><strong>${escapeHtml(profile.display_name || profile.email)}</strong></p>
        <p style="margin:4px 0;color:#475569;">${escapeHtml(profile.email)}</p>
        <p style="margin-top:20px;">A new user has signed in to the admin portal but doesn't have admin access yet. Review and grant access if appropriate.</p>
        <p style="margin-top:24px;">
          <a href="${adminUrl}" style="display:inline-block;background:#10B981;color:#0F172A;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;">
            Open Admin Console →
          </a>
        </p>
      </div>
    `;

    const res = await fetch("https://api.postmarkapp.com/email/batch", {
      method: "POST",
      headers: {
        "X-Postmark-Server-Token": TOKEN,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(adminEmails.map((to) => ({
        From: FROM, To: to,
        Subject: `New admin signup: ${profile.display_name || profile.email}`,
        HtmlBody: html,
        MessageStream: STREAM,
      }))),
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Postmark failed [${res.status}]: ${errBody}`);
    }

    return new Response(JSON.stringify({ ok: true, notified: adminEmails.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("notify-admins-new-signup error", e);
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
