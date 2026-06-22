'use server';

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email est requis" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email invalide" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      // Ici tu pourrais envoyer un mail réel avec un token de réinitialisation.
      return NextResponse.json(
        { message: "Un email de réinitialisation a été envoyé si ce compte existe." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Un email de réinitialisation a été envoyé si ce compte existe." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur forgot password:", error);
    return NextResponse.json(
      { error: "Erreur lors de la réinitialisation" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
