'use server';

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/resend-mail";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!normalizedEmail || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });

    if (user) {
      try {
        // Générer un token de réinitialisation sécurisé
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // Expire dans 1 heure

        // Mettre à jour l'utilisateur avec le token
        await prisma.user.update({
          where: { id: user.id },
          data: {
            resetToken: resetToken,
            resetTokenExpiry: resetTokenExpiry,
          },
        });

        // Déterminer la langue (par défaut français)
        const language = request.headers.get("accept-language")?.startsWith("en") ? "en" : "fr";

        // Obtenir l'URL de base de la requête
        const baseUrl = `${request.nextUrl.protocol}//${request.nextUrl.host}`;

        // Envoyer l'email de réinitialisation
        const emailSent = await sendPasswordResetEmail(normalizedEmail, resetToken, baseUrl, language);

        if (!emailSent) {
          console.error("Password reset email could not be sent. Check Resend configuration and sender address.");
          return NextResponse.json(
            { error: "Unable to send the reset email. Please verify your Resend configuration and sender address." },
            { status: 502 }
          );
        }

        return NextResponse.json(
          { message: "A password reset email has been sent if the account exists." },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error generating token or sending email:", error);
        return NextResponse.json(
          { error: "Unable to send the reset email. Please try again later." },
          { status: 502 }
        );
      }
    }

    // Message générique pour ne pas révéler si l'email existe
    return NextResponse.json(
      { message: "A password reset email has been sent if the account exists." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error forgot password:", error);
    return NextResponse.json(
      { error: "Error occurred while requesting password reset" },
      { status: 500 }
    );
  }
}
