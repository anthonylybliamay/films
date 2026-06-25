'use server';
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {

  try {
    const { email, password } = await request.json();
    const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    // Validation
    if (!normalizedEmail || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Chercher l'utilisateur (insensible à la casse et compatible avec les anciens comptes)
    const user = await prisma.user.findFirst({
      where: { email: { equals: normalizedEmail, mode: "insensitive" } },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe, y compris pour les anciens comptes stockés en clair
    const passwordMatch = await (async () => {
      if (user.password.startsWith("$2")) {
        try {
          return await bcrypt.compare(password, user.password);
        } catch {
          return false;
        }
      }

      return user.password === password;
    })();

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Email or password is incorrect" },
        { status: 401 }
      );
    }

    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Error during login" },
      { status: 500 }
    );
  }
}
