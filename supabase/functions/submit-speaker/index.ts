import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), {
    status: s,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);

    const body = await req.json();
    const name = String(body?.name || "").trim();
    const email = String(body?.email || "").trim();
    const linkedinUrl = String(body?.linkedin_url || "").trim();
    const description = String(body?.description || "").trim();
    const phone = String(body?.phone || "").trim();
    const whatBuilding = String(body?.what_building || "").trim();
    const imageBase64 = body?.image_base64 ? String(body.image_base64) : "";
    const imageName = body?.image_name ? String(body.image_name) : "";

    if (!name || name.length > 200) return json({ error: "Name required" }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Valid email required" }, 400);
    if (!description || description.length > 5000) return json({ error: "Description required" }, 400);
    if (!whatBuilding || whatBuilding.length > 5000) return json({ error: "Tell us what you're building" }, 400);

    let imageUrl: string | null = null;
    if (imageBase64 && imageName) {
      try {
        const base64Data = imageBase64.split(",")[1] || imageBase64;
        const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
        const ext = (imageName.split(".").pop() || "png").toLowerCase().replace(/[^a-z0-9]/g, "");
        const storagePath = `${crypto.randomUUID()}.${ext}`;
        const { error: upErr } = await admin.storage.from("speakers")
          .upload(storagePath, binaryData, { contentType: `image/${ext === "jpg" ? "jpeg" : ext}` });
        if (!upErr) {
          imageUrl = admin.storage.from("speakers").getPublicUrl(storagePath).data.publicUrl;
        } else {
          console.error("Image upload failed:", upErr);
        }
      } catch (e) {
        console.error("Image processing error:", e);
      }
    }

    const { data: inserted, error: insertError } = await admin
      .from("speakers")
      .insert({
        name, email, linkedin_url: linkedinUrl || null,
        description, phone: phone || null,
        what_building: whatBuilding, image_url: imageUrl,
      })
      .select("id").single();
    if (insertError) throw insertError;

    // Notify
    const TOKEN = Deno.env.get("POSTMARK_SERVER_TOKEN");
    const FROM = Deno.env.get("POSTMARK_FROM_EMAIL");
    const STREAM = Deno.env.get("POSTMARK_MESSAGE_STREAM") || "broadcast";

    if (TOKEN && FROM) {
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
      if (!adminEmails.length) adminEmails = ["jake@attentio.ai", "mosborn@skail.ai"];

      // Confirmation to applicant
      await fetch("https://api.postmarkapp.com/email", {
        method: "POST",
        headers: {
          "X-Postmark-Server-Token": TOKEN,
          "Content-Type": "application/json", "Accept": "application/json",
        },
        body: JSON.stringify({
          From: FROM, To: email,
          Subject: "We received your Wild AI speaker application",
          MessageStream: STREAM,
          HtmlBody: `
            <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0F172A;">
              <h2 style="color:#0F172A;">Thanks for applying to speak at Wild AI, ${escapeHtml(name)}!</h2>
              <p>We've received your application and the Wild AI team will review it shortly.</p>
              <p>If you're a great fit for an upcoming meetup, we'll reach out to confirm a date.</p>
              <p style="color:#64748B;font-size:14px;margin-top:32px;">
                Wild AI · Hear from local AI leaders. Network with researchers and builders. Share ideas that shape what's next.
              </p>
            </div>
          `,
        }),
      }).catch((e) => console.error("Confirmation email failed:", e));

      // Admin notification
      const adminUrl = "https://wild-ai-website.lovable.app/admin";
      const adminHtml = `
        <div style="font-family:system-ui,sans-serif;max-width:640px;margin:0 auto;padding:24px;color:#0F172A;">
          <h2>New Speaker Application</h2>
          ${imageUrl ? `<img src="${imageUrl}" alt="" style="width:120px;height:120px;border-radius:8px;object-fit:cover;margin-bottom:12px;" />` : ""}
          <p><strong>${escapeHtml(name)}</strong></p>
          <p style="margin:4px 0;color:#475569;">${escapeHtml(email)}${phone ? " · " + escapeHtml(phone) : ""}</p>
          ${linkedinUrl ? `<p style="margin:4px 0;"><a href="${escapeHtml(linkedinUrl)}">${escapeHtml(linkedinUrl)}</a></p>` : ""}
          <h3 style="margin-top:20px;">About them</h3>
          <p style="white-space:pre-wrap;">${escapeHtml(description)}</p>
          <h3 style="margin-top:20px;">What they're building</h3>
          <p style="white-space:pre-wrap;">${escapeHtml(whatBuilding)}</p>
          <p style="margin-top:24px;">
            <a href="${adminUrl}" style="display:inline-block;background:#10B981;color:#0F172A;font-weight:bold;padding:12px 24px;border-radius:8px;text-decoration:none;">
              Review in Admin →
            </a>
          </p>
        </div>
      `;
      await fetch("https://api.postmarkapp.com/email/batch", {
        method: "POST",
        headers: {
          "X-Postmark-Server-Token": TOKEN,
          "Content-Type": "application/json", "Accept": "application/json",
        },
        body: JSON.stringify(adminEmails.map((to) => ({
          From: FROM, To: to,
          Subject: `New speaker application: ${name}`,
          HtmlBody: adminHtml,
          MessageStream: STREAM,
        }))),
      }).catch((e) => console.error("Admin notification failed:", e));
    }

    return json({ ok: true, id: inserted?.id });
  } catch (e: any) {
    console.error("submit-speaker error", e);
    return json({ error: e?.message || "Server error" }, 500);
  }
});
