"use server";

import { Resend } from "resend";
import { tryConsumeContactSubmissionSlot } from "@/lib/contact-rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailAction(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { name, email, subject, message } = formData;

  const rateLimit = await tryConsumeContactSubmissionSlot();
  if (!rateLimit.ok) {
    return {
      success: false,
      error: rateLimit.message,
      rateLimited: true as const,
    };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["breatouch@outlook.com"],
      subject: `Nieuw contactformulier: ${subject}`,
      text: `
Naam: ${name}
E-mail: ${email}
Onderwerp: ${subject}

Bericht:
${message}
      `,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return {
        success: false,
        error: error.message,
        rateLimited: false as const,
      };
    }

    return { success: true, data, rateLimited: false as const };
  } catch (error) {
    console.error("Send email error:", error);
    return {
      success: false,
      error: "Kon e-mail niet verzenden.",
      rateLimited: false as const,
    };
  }
}
