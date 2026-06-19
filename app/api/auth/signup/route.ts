import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";

export async function POST(request: NextRequest) {
  const { language } = useLanguage();
  const t = translations[language];
  try {
    const { nom, email, password } = await request.json();
   

    // Validation
    if (!nom || !email || !password) {
      return NextResponse.json(
        { error: t.errorchampRequired },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: t.errorMDP },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: t.errorEmailInvalide },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: t.errorEmailUtilise },
        { status: 400 }
      );
    }

    // Séparer le nom en firstName et lastName
    const nameParts = nom.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : nameParts[0];

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: t.inscriptionReussie,
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur d'inscription:", error);
    return NextResponse.json(
      { error: t.errordInscription },
      { status: 500 }
    );
  }
}
