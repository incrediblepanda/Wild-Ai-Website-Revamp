import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { name, projectName, description, email, linkedinUrl, imageBase64, imageName } = await req.json();

    // Upload image to storage if provided
    let imageUrl: string | null = null;
    if (imageBase64 && imageName) {
      const base64Data = imageBase64.split(",")[1] || imageBase64;
      const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
      const ext = imageName.split(".").pop() || "png";
      const storagePath = `${crypto.randomUUID()}.${ext}`;

      // Try to create bucket if it doesn't exist
      await supabase.storage.createBucket("show-and-tell", { public: true }).catch(() => {});

      const { error: uploadError } = await supabase.storage
        .from("show-and-tell")
        .upload(storagePath, binaryData, { contentType: `image/${ext}` });

      if (!uploadError) {
        const { data: urlData } = supabase.storage
          .from("show-and-tell")
          .getPublicUrl(storagePath);
        imageUrl = urlData.publicUrl;
      }
    }

    // Insert submission
    const { data: submission, error: insertError } = await supabase
      .from("show_and_tell_submissions")
      .insert({
        name,
        project_name: projectName,
        description,
        email,
        linkedin_url: linkedinUrl,
        image_url: imageUrl,
      })
      .select("id, approval_token")
      .single();

    if (insertError) throw insertError;

    // Build admin link
    const adminUrl = "https://wild-ai-website.lovable.app/admin/show-and-tell";

    // Send notification email to admins
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Show & Tell Submission</h2>
        <p><strong>${name}</strong> submitted <strong>${projectName}</strong></p>
        <p style="color: #666;">${description}</p>
        <p style="margin-top: 24px;">
          <a href="${adminUrl}" style="display: inline-block; background: #4ade80; color: #000; font-weight: bold; padding: 12px 32px; border-radius: 8px; text-decoration: none;">Review in Admin →</a>
        </p>
      </div>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Wild AI <onboarding@resend.dev>",
        to: ["jake@attentio.ai", "mosborn@skail.ai"],
        subject: `New Show & Tell Submission: ${projectName}`,
        html: emailHtml,
      }),
    });

    if (!resendRes.ok) {
      const resendError = await resendRes.text();
      console.error("Resend error:", resendError);
      // Don't fail the submission if email fails
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
