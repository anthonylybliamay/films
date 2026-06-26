import { Resend } from "resend";
import { translations } from "@/lib/translations";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(
  to: string,
  resetToken: string,
  baseUrl: string,
  language: string = "fr",
  replyTo: string = "anthony.lybliamay@gelti.fr"
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return false;
  }

  const locale = language === "en" ? "en" : "fr";
  const t = translations[locale] ?? translations.fr;
  const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;
  const subject = t.resetPasswordEmailSubject;
  const html = `
    <p>${t.resetPasswordEmailGreeting}</p>
    <p><a href="${resetUrl}">${t.resetPasswordEmailButton}</a></p>
    <p>${t.resetPasswordEmailIgnore}</p>
  `;
  const fromEmail = "info@anthonylybliamay.fr";

  try {
    const response = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
      replyTo,
    });

    if (response.error) {
      console.error("Resend email error:", response.error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return false;
  }
}
