import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { filmId, note } = await request.json();
    const userId = request.headers.get("x-user-id");

    if (!userId || !filmId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingNote = await prisma.personalNote.findUnique({
      where: {
        userId_filmId: {
          userId,
          filmId,
        },
      },
    });

    const savedNote = existingNote
      ? await prisma.personalNote.update({
          where: { id: existingNote.id },
          data: { note },
        })
      : await prisma.personalNote.create({
          data: {
            filmId,
            note,
            userId,
          },
        });

    return NextResponse.json({
      note: savedNote.note,
      message: "Note saved",
    });
  } catch (error) {
    console.error("Error saving personal note:", error);
    return NextResponse.json(
      { error: "Failed to save personal note" },
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

    const note = await prisma.personalNote.findUnique({
      where: {
        userId_filmId: {
          userId,
          filmId,
        },
      },
    });

    return NextResponse.json({
      note: note?.note ?? "",
    });
  } catch (error) {
    console.error("Error loading personal note:", error);
    return NextResponse.json(
      { error: "Failed to load personal note" },
      { status: 500 }
    );
  }
}
