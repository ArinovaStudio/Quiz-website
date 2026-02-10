import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export async function GET() {
  try {
    const userId = await checkUser();
    if (!userId){
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const history = await prisma.registration.findMany({
      where: { userId, hasPaid: true },
      orderBy: { createdAt: "desc" },
      include: {
        tournament: {
          select: {
            id: true,
            title: true,
            status: true,
            totalQuestions: true
          }
        }
      }
    });

    const formattedHistory = history.map(record => ({
      tournamentId: record.tournament.id,
      title: record.tournament.title,
      status: record.tournament.status,
      score: `${record.score}/${record.tournament.totalQuestions}`,
      timeTaken: record.totalTime.toFixed(2) + "s",
      rank: record.rank ? `${record.rank}` : "Pending",
      date: record.createdAt
    }));

    return NextResponse.json({ success: true, history: formattedHistory });

  } catch {
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}