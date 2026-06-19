import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { translations } from "@/lib/translations";
import { useLanguage } from "@/context/LanguageContext";


export async function POST(request: NextRequest) {
  const { language } = useLanguage();
  const t = translations[language];
  try {
    const { email, password } = await request.json();

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: t.emailmdpRequired },
        { status: 400 }
      );
    }

    // Chercher l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: t.emailOuMotDePasseIncorrect },
        { status: 401 }
      );
    }

    // Vérifier le mot de passe
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: t.emailOuMotDePasseIncorrect },
        { status: 401 }
      );
    }

    // Ne pas retourner le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Connexion réussie",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur de connexion:", error);
    return NextResponse.json(
      { error: t.connexionErreur },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
