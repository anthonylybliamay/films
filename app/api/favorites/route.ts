import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { filmId, filmTitle, filmImage } = await request.json();
    const userId = request.headers.get("x-user-id");

    if (!userId || !filmId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Vérifier si le favori existe déjà
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_filmId: {
          userId,
          filmId,
        },
      },
    });

    if (existingFavorite) {
      // Si existe, le supprimer (toggle)
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id,
        },
      });

      return NextResponse.json({
        isFavorite: false,
        message: "Removed from favorites",
      });
    } else {
      // Sinon, l'ajouter
      const newFavorite = await prisma.favorite.create({
        data: {
          filmId,
          filmTitle,
          filmImage,
          userId,
        },
      });

      return NextResponse.json({
        isFavorite: true,
        message: "Added to favorites",
        favorite: newFavorite,
      });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return NextResponse.json(
      { error: "Failed to toggle favorite" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("x-user-id");
    const filmId = request.nextUrl.searchParams.get("filmId");

    if (!userId || !filmId) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_filmId: {
          userId,
          filmId,
        },
      },
    });

    return NextResponse.json({
      isFavorite: !!favorite,
    });
  } catch (error) {
    console.error("Error checking favorite:", error);
    return NextResponse.json(
      { error: "Failed to check favorite" },
      { status: 500 }
    );
  }
}
