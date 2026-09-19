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
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const token = url.searchParams.get("token");
    const action = url.searchParams.get("action");

    if (!id || !token || !action || !["approve", "deny"].includes(action)) {
      return new Response(htmlPage("Invalid Request", "The link you followed is invalid or expired."), {
        status: 400,
        headers: { "Content-Type": "text/html" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Verify token and get submission
    const { data: submission, error } = await supabase
      .from("show_and_tell_submissions")
      .select("*")
      .eq("id", id)
      .eq("approval_token", token)
      .maybeSingle();

    if (error || !submission) {
      return new Response(htmlPage("Not Found", "This submission was not found or the link has expired."), {
        status: 404,
        headers: { "Content-Type": "text/html" },
      });
    }

    if (submission.status !== "pending") {
      return new Response(htmlPage("Already Processed", `This submission has already been ${submission.status}.`), {
        status: 200,
        headers: { "Content-Type": "text/html" },
      });
    }

    // Update status
    const newStatus = action === "approve" ? "approved" : "denied";
    const { error: updateError } = await supabase
      .from("show_and_tell_submissions")
      .update({ status: newStatus })
      .eq("id", id);

    if (updateError) throw updateError;

    // If approved, send notification email to submitter
    if (action === "approve" && RESEND_API_KEY) {
      const approvalHtml = `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">🎉 Your Project Has Been Approved!</h2>
          <p>Hi ${submission.name},</p>
          <p>Great news! Wild AI is promoting your project <strong>${submission.project_name}</strong> on our Show & Tell page.</p>
          <p>Your project will be featured at our upcoming meetup and on our website. Thank you for being part of the Wild AI community!</p>
          <p style="margin-top: 30px;">
            <a href="https://wild-ai-website.lovable.app/show-and-tell" style="display: inline-block; background: #4ade80; color: #000; font-weight: bold; padding: 12px 32px; border-radius: 8px; text-decoration: none;">View Show & Tell Page</a>
          </p>
          <p style="margin-top: 20px; color: #666;">— The Wild AI Team</p>
        </div>
      `;

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
          html: approvalHtml,
        }),
      });
    }

    const title = action === "approve" ? "Approved! ✅" : "Denied ❌";
    const message = action === "approve"
      ? `"${submission.project_name}" by ${submission.name} has been approved and is now live on the Show & Tell page. A notification email has been sent.`
      : `"${submission.project_name}" by ${submission.name} has been denied.`;

    return new Response(htmlPage(title, message), {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(htmlPage("Error", "Something went wrong. Please try again."), {
      status: 500,
      headers: { "Content-Type": "text/html" },
    });
  }
});

function htmlPage(title: string, message: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} — Wild AI</title></head>
<body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #111; color: #fff;">
  <div style="text-align: center; padding: 40px; max-width: 500px;">
    <h1 style="font-size: 2rem; margin-bottom: 16px;">${title}</h1>
    <p style="color: #aaa; font-size: 1.1rem; line-height: 1.6;">${message}</p>
    <a href="https://wild-ai-website.lovable.app" style="display: inline-block; margin-top: 24px; color: #4ade80; text-decoration: none;">← Back to Wild AI</a>
  </div>
</body>
</html>`;
}
