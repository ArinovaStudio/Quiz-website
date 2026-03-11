"use client";
import Link from "@/components/AppLink";
import ErrorLoading from "@/components/ErrorLoading";
import { getDate } from "@/lib/dateAndTime";
import { fetcher } from "@/lib/fetcher";
import { motion } from "framer-motion";
import { Award, Trophy } from "lucide-react";
import useSWR from "swr";
import { HandleSkeleton } from "../../(navigation)/profile/_components/HandleSkeleton";
import Wrapper from "../_components/Wrapper";
import PlayedQuizCard, { PlayedQuizCardSkeleton } from "./_components/PlayedQuizCard";
export default function page() {
  const { data, isLoading, error, isValidating } = useSWR(
    "/api/user/profile/played-quiz",
    fetcher,
    {
      revalidateOnFocus: false
    }
  );
  return (
    <Wrapper title="Played Quiz">
      <div className="p-4">
        <div
          className="rounded-[14px] border-[3px] border-black p-4 bg-white mb-4 animate-fade-in"
          style={{ boxShadow: "4px 4px 0px #000000" }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 stroke-[2.5px]" />
              <span className="text-[14px] font-[800] uppercase">
                Total Played
              </span>
            </div>
            <span className="text-[24px] font-[900]">
              <HandleSkeleton loading={isLoading || isValidating}>
                {data?.data?.playedQuiz}
              </HandleSkeleton>
            </span>
          </div>
        </div>

        <h2 className="text-[16px] font-[900] uppercase mb-3">
          Recent Quizzes
        </h2>
        <div className="space-y-3 z-200">
          <ErrorLoading
            loading={isLoading}
            error={error}
            loadingCard={PlayedQuizCardSkeleton}
            loadingCount={5}
            loadingCols={1}
            loadingRows={5}
            dataLength={data?.data?.quizInfo?.length}
            emptyMessage="You haven't played any quiz!"
            className="grid gap-3"
          >
            {data?.data?.quizInfo?.map((quiz: any, index: number) => (
              <PlayedQuizCard key={quiz.id} index={index} event={quiz} getDate={getDate}/>
            ))}
          </ErrorLoading>
        </div>
      </div>
    </Wrapper>
  );
}
