import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password, action, id } = await req.json();
    const ADMIN_PASSWORD = Deno.env.get("ADMIN_PASSWORD");

    if (!password || password !== ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Invalid password" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // List pending submissions
    if (!action) {
      const { data, error } = await supabase
        .from("show_and_tell_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify({ submissions: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Approve or deny
    if ((action === "approve" || action === "deny") && id) {
      const newStatus = action === "approve" ? "approved" : "denied";
      const { error: updateError } = await supabase
        .from("show_and_tell_submissions")
        .update({ status: newStatus })
        .eq("id", id);

      if (updateError) throw updateError;

      // Send approval email if approving
      if (action === "approve") {
        const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
        const { data: submission } = await supabase
          .from("show_and_tell_submissions")
          .select("*")
          .eq("id", id)
          .single();

        if (RESEND_API_KEY && submission) {
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${RESEND_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Wild AI <onboarding@resend.dev>",
              to: [submission.email],
              subject: `🎉 Wild AI is promoting your project: ${submission.project_name}`,
              html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
                <h2 style="color:#333;">🎉 Your Project Has Been Approved!</h2>
                <p>Hi ${submission.name},</p>
                <p>Great news! Your project <strong>${submission.project_name}</strong> is now live on our Show & Tell page.</p>
                <p style="margin-top:30px;"><a href="https://wild-ai-website.lovable.app/show-and-tell" style="display:inline-block;background:#4ade80;color:#000;font-weight:bold;padding:12px 32px;border-radius:8px;text-decoration:none;">View Show & Tell Page</a></p>
                <p style="margin-top:20px;color:#666;">— The Wild AI Team</p>
              </div>`,
            }),
          });
        }
      }

      return new Response(JSON.stringify({ success: true, status: newStatus }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
