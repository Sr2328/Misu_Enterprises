import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: "new_application" | "status_update";
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  newStatus?: string;
  employerEmail?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.log("RESEND_API_KEY not configured - skipping email");
      return new Response(JSON.stringify({ success: true, message: "Email not configured" }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const body: NotificationRequest = await req.json();
    const { type, jobTitle, applicantName, applicantEmail, newStatus } = body;
    const resend = new Resend(resendApiKey);

    if (type === "new_application") {
      await resend.emails.send({
        from: "MISO Jobs <onboarding@resend.dev>",
        to: [applicantEmail],
        subject: `Application Submitted: ${jobTitle}`,
        html: `<h1>Application Received!</h1><p>Hi ${applicantName}, your application for ${jobTitle} has been submitted.</p>`,
      });
    } else if (type === "status_update" && newStatus) {
      await resend.emails.send({
        from: "MISO Jobs <onboarding@resend.dev>",
        to: [applicantEmail],
        subject: `Application Update: ${jobTitle}`,
        html: `<h1>Status Update</h1><p>Hi ${applicantName}, your application status is now: ${newStatus}</p>`,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};

serve(handler);
