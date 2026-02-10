import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkUser } from "@/lib/checkAuth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const userId = await checkUser();
    if (!userId){
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const { id: tournamentId } = await params;

    const tournament = await prisma.tournament.findUnique({
        where: { id: tournamentId },
        include: {
            questions: { 
                include: { options: { select: { id: true, text: true } } },
            },
        },
    });

    if (!tournament) return NextResponse.json({ success: false, message: "Tournament Not Found" }, { status: 404 });

    const userResponses = await prisma.userResponse.findMany({
        where: {
            userId: userId,
            questionId: { in: tournament.questions.map(q => q.id) }
        },
        select: { questionId: true }
    });

    const answeredQuestionIds = new Set(userResponses.map(r => r.questionId));

    const start = tournament.startTime.getTime();
    const durationMs = tournament.durationPerQ * 1000;
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {

        while (true) {
            try {
            const now = Date.now();

            if (now < start) {
                const data = JSON.stringify({ status: "WAITING", startTime: tournament.startTime });
                controller.enqueue(encoder.encode(`data: ${data}\n\n`));

            } else {
                const timeElapsed = now - start;
                const questionIndex = Math.floor(timeElapsed / durationMs);

                // Game Over Check
                if (questionIndex >= tournament.questions.length) {
                    const data = JSON.stringify({ status: "FINISHED" });
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                    controller.close(); 
                    break;
                }

                const currentQ = tournament.questions[questionIndex];
                const endTime = start + (questionIndex + 1) * durationMs;
                const timeRemaining = Math.max(0, Math.ceil((endTime - now) / 1000));

                const isAnswered = answeredQuestionIds.has(currentQ.id);

                const payload = JSON.stringify({
                    status: "LIVE",
                    questionIndex: questionIndex + 1,
                    totalQuestions: tournament.totalQuestions,
                    timeRemaining,
                    isAnswered,
                    question: {
                        id: currentQ.id,
                        text: currentQ.text,
                        options: currentQ.options,
                    },
                });

                controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
            }

            // Loop delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            } catch {
                controller.close();
                break;
            }
        }
        },
    });

    return new NextResponse(stream, {
        headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        },
    });
}