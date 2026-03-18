import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getTournamentStatus } from "@/lib/getTournamentStatus";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const defaultStatus = ["LIVE", "PUBLISHED"];
    if (!id) {
      throw Error();
    }
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor") || null; 
    const limit = parseInt(url.searchParams.get("limit") as string) || 10;
    const tournament = await prisma.tournament.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        startTime: true,
        durationPerQ: true,
        totalQuestions: true,
        windowOpenTime: true,
        endTime: true,
        entryFee: true,
        prizePool: true,
        totalSeats: true,
        winningSeats: true,
        difficulty: true,
        _count: { select: { registration: true } },
      },
    });
    if (!tournament) {
      throw Error("Tournament Not Found!");
    }
    const Timenow = new Date();
    const recommendedTournaments = (
      await prisma.tournament.findMany({
        take: limit as number,
        cursor: cursor ? {id: cursor}: undefined,
        skip: cursor ? 1:0,
        where: {
          NOT: { id: id },
          categoryId: tournament.category.id,
          AND: [
            { windowOpenTime: { lte: Timenow } },
            { endTime: { gte: Timenow } },
          ],
        },
        select: {
          id: true,
          title: true,
          category: true,
          startTime: true,
          durationPerQ: true,
          totalQuestions: true,
          windowOpenTime: true,
          endTime: true,
          entryFee: true,
          prizePool: true,
          totalSeats: true,
          language: true,
          winningSeats: true,
          difficulty: true,
          _count: { select: { registration: true } },
        },
      })
    )?.filter((quiz) => {
      return defaultStatus.includes(getTournamentStatus(quiz));
    });
    const finalRecommendations = recommendedTournaments?.map(
      ({ winningSeats, entryFee, prizePool, _count, ...rest }: any) => ({
        ...rest,
        winningSeats,
        prizePool: Math.round(prizePool),
        entryFee: Math.round(entryFee),
        status: getTournamentStatus({ ...rest }),
        seatsLeft: rest.totalSeats - winningSeats - _count.registration,
      })
    );
    let nextCursor = null;
    if(finalRecommendations.length>limit){
        nextCursor = finalRecommendations[finalRecommendations.length - 1].id;
    }
    return NextResponse.json(
      {
        success: true,
        tournaments: finalRecommendations,
        nextCursor
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
