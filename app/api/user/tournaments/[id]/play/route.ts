import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await checkUser();
    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { id: tournamentId } = await params;

    const tournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
      include: {
        questions: {
          orderBy: { text: "asc" },
          include: {
            options: {
              select: { id: true, text: true }
            }
          },
        },
      },
    });

    if (!tournament) {
      return NextResponse.json({ success: false, message: "Tournament Not Found" }, { status: 404 });
    }

    const registration = await prisma.registration.findUnique({
      where: { userId_tournamentId: { userId, tournamentId } }
    });

    if (!registration || !registration.hasPaid) {
      return NextResponse.json({ success: false, message: "Not registered" }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      tournament: {
        id: tournament.id,
        title: tournament.title,
        status: tournament.status,
        startTime: tournament.startTime,
        durationPerQ: tournament.durationPerQ,
        totalQuestions: tournament.totalQuestions,
        questions: tournament.questions
      },
    }, { status: 200 });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}