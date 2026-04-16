"use client";

import { HandleSkeleton } from "@/app/mobile/(user)/(navigation)/profile/_components/HandleSkeleton";
import Link from "@/components/AppLink";
import { SlideToContinueModal } from "@/components/SlideToContinueModal";
import { fetcher } from "@/lib/fetcher";
import {
  Calendar,
  Clock,
  Clock10,
  FileQuestion,
  Loader2,
  Medal,
  Award,
  Trophy,
  Zap,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import Wrapper from "../../_components/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { getFormattedRank } from "@/lib/constants";
const difficultyColors = {
  EASY: "bg-[#A5F3A0]",
  MEDIUM: "bg-[#FFDB58]",
  HARD: "bg-[#A78BFA]",
  EXPERT: "bg-[#F97316]",
};

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const [showSlideModal, setShowSlideModal] = useState(false);

  const handleJoinContest = () => {
    if (canJoin) setShowSlideModal(true);
  };

  const handleSlideConfirm = () => {
    setShowSlideModal(false);
    router.push(`/mobile/join-quiz/${id}/play`);
  };

  const { data, isLoading, isValidating } = useSWR(
    `/api/user/tournaments/${id}`,
    fetcher
  );
  const {
    data: dwallet,
    isLoading: wloading,
    isValidating: wvalidating,
  } = useSWR("/api/user/wallet", fetcher);
  const {
    data: registration,
    isLoading: registrationLoading,
    isValidating: registrationValidating,
    mutate,
  } = useSWR(`/api/user/tournaments/${id}/check-registration`, fetcher);
  const loading =
    isLoading ||
    isValidating ||
    wloading ||
    wvalidating ||
    registrationLoading ||
    registrationValidating;
  const tournament = data?.tournament;
  const wallet = dwallet?.wallet;
  const progress =
    ((tournament?.totalSeats - tournament?.seatsLeft) /
      tournament?.totalSeats) *
    100;
  const userWalletBalance = wallet?.balance;
  const entryFee = parseInt(tournament?.entryFee ?? ""?.replace(/[₹,]/g, ""));
  const tournamentStatus = tournament?.status;
  const canJoin = userWalletBalance >= entryFee;
  const isRegistered = registration?.success === true;
  const registrationData = registration?.registration;
  const hasPlayed = registrationData?.status === "PLAYED";
  const [pending, setPending] = useState(false);
  let buttonLabel = "";
  let isDisabled = true;
  let onClickHandler: (() => void) | undefined = undefined;
  const handleRegister = async () => {
    try {
      setPending(true);
      const request = await fetch(`/api/user/tournaments/${id}/register`, {
        method: "POST",
        body: JSON.stringify({
          tournamentId: id,
        }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      toast.success(response.message);
      mutate();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };
  const iso = tournament?.startTime;

  let startTime = "";
  let startDate = "";

  if (iso) {
    const hours = parseInt(iso.slice(11, 13));
    const minutes = iso.slice(14, 16);

    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    startTime = `${formattedHours}:${minutes} ${ampm}`;

    startDate = `${iso.slice(8, 10)}-${iso.slice(5, 7)}-${iso.slice(0, 4)}`;
  }
  switch (tournamentStatus) {
    case "DRAFT":
      buttonLabel = "⏳ Contest hasn't started yet";
      break;

    case "PUBLISHED":
      buttonLabel = `Opens at ${startTime} on ${startDate}`;
      isDisabled = true;
      break;
    case "LIVE":
      if (isRegistered) {
        if (hasPlayed) {
          buttonLabel = "Already Played ✅";
          isDisabled = true;
        } else {
          buttonLabel = "🚀 Join Quiz";
          isDisabled = false;
          onClickHandler = handleJoinContest;
        }
      } else {
        buttonLabel = "🎯 Register Now";
        isDisabled = pending;
        onClickHandler = handleRegister;
      }
      break;

    case "COMPLETED":
      buttonLabel = "🏁 Contest has ended";
      break;
  }
  const prizes = tournament?.prizes ?? [];
  return (
    <Wrapper title="Join contest">
      {/* Header */}
      <div className="p-4">
        <div className="relative bg-[#FFDB58] rounded-[16px] p-5 border-[4px] border-black overflow-hidden shadow-[6px_6px_0px_#000]">
          <div className="relative z-10">
            <h2 className="text-[24px] font-[900] uppercase mb-4">
              <HandleSkeleton loading={loading}>
                {tournament?.title}
              </HandleSkeleton>
            </h2>

            {/* Prize + Entry */}
            <div className="flex gap-2 mb-4">
              <div className="bg-white rounded-[10px] px-3 py-2 border-[3px] border-black shadow-[3px_3px_0px_#000]">
                <p className="text-[10px] font-[800] uppercase text-black/60">
                  Prize Pool
                </p>
                <div className="text-[20px] font-[900]">
                  <HandleSkeleton loading={loading}>
                    ₹{tournament?.prizePool}
                  </HandleSkeleton>
                </div>
              </div>

              <div className="bg-white rounded-[10px] px-3 py-2 border-[3px] border-black shadow-[3px_3px_0px_#000]">
                <p className="text-[10px] font-[800] uppercase text-black/60">
                  Entry Fee
                </p>
                <div className="text-[20px] font-[900]">
                  <HandleSkeleton loading={loading}>
                    ₹{tournament?.entryFee}
                  </HandleSkeleton>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="flex justify-between text-[12px] font-[800] uppercase mb-1">
              <span>
                <HandleSkeleton loading={loading}>
                  {tournament?.totalSeats - tournament?.seatsLeft}/
                  {tournament?.totalSeats}{" "}
                </HandleSkeleton>
                Joined
              </span>
              <span>
                <HandleSkeleton loading={loading}>
                  {Math.round(progress)}%
                </HandleSkeleton>
              </span>
            </div>

            <div className="w-full h-[10px] bg-black/20 rounded-[6px] border-[2px] border-black overflow-hidden">
              <div
                className="h-full bg-black transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contest Info */}
      <div className="px-4 space-y-4 pb-4">
        <h3 className="text-[18px] font-[900] uppercase mb-3">Contest Info</h3>

        <div className="grid grid-cols-2 px-2 h-full gap-3">
          <InfoCard
            icon={<FileQuestion />}
            value={
              <HandleSkeleton loading={loading}>
                {tournament?.totalQuestions}
              </HandleSkeleton>
            }
            label="Questions"
            bg="bg-[#A5F3FC]"
          />
          <InfoCard
            icon={<Clock />}
            value={
              <HandleSkeleton loading={loading}>
                {tournament?.durationPerQ}
              </HandleSkeleton>
            }
            label="Seconds Duration Per Question"
            bg="bg-[#A78BFA]"
          />
          <InfoCard
            icon={<Zap />}
            value={
              <HandleSkeleton loading={loading}>
                {tournament?.difficulty}
              </HandleSkeleton>
            }
            label="Difficulty"
            bg={
              difficultyColors[
                tournament?.difficulty as keyof typeof difficultyColors
              ]
            }
          />
          <InfoCard
            icon={<Trophy />}
            value={
              <HandleSkeleton loading={loading}>
                Top {tournament?.winningSeats}
              </HandleSkeleton>
            }
            label="Win Prizes"
            bg="bg-[#A5F3A0]"
          />
          <InfoCard
            icon={<Calendar />}
            value={
              <HandleSkeleton loading={loading}>{startDate}</HandleSkeleton>
            }
            label="Date"
            bg="bg-[#A5F3A0]"
          />
          <InfoCard
            icon={<Clock10 />}
            value={
              <HandleSkeleton loading={loading}>{startTime}</HandleSkeleton>
            }
            label="Time"
            bg="bg-[#A78BFA]"
          />
        </div>
        <div className="col-span-2">
          <div className="border rounded-xl p-4 bg-card shadow-sm">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <h3 className="text-sm font-semibold tracking-wide">
                Prize Distribution
              </h3>
            </div>

            {/* Content */}
            {prizes && prizes.length > 0 ? (
              <div className="grid gap-3">
                {prizes.map((prize: string, i: number) => {
                  const Icon =
                    i === 0
                      ? Trophy
                      : i === 1
                      ? Medal
                      : i === 2
                      ? Award
                      : Award;

                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-2 rounded-lg border bg-muted/40 hover:bg-muted transition"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold">
                          {getFormattedRank(i + 1)}
                        </span>
                      </div>

                      <span className="text-sm text-muted-foreground font-medium">
                        {prize || "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-xs font-medium text-muted-foreground">
                No prizes defined yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wallet */}
      <div className="px-4 pb-4">
        <div
          className={`rounded-[12px] p-4 border-[3px] border-black flex justify-between items-center shadow-[4px_4px_0px_#000] ${
            canJoin ? "bg-[#A5F3A0]" : "bg-[#FFDB58]"
          }`}
        >
          <span className="font-[800] uppercase">Your Balance:</span>
          <span className="text-[18px] font-[900]">
            <HandleSkeleton loading={loading}>
              ₹{userWalletBalance}
            </HandleSkeleton>
          </span>
        </div>
      </div>

      {/* Join Button */}
      <div className="px-4 pb-6">
        <button
          disabled={isDisabled || loading}
          onClick={onClickHandler}
          className={`w-full 
              py-3 sm:py-4 md:py-5
              rounded-[12px] sm:rounded-[14px]
              border-[3px] sm:border-[4px] border-black 
              uppercase font-[900] 
              text-[12px] sm:text-[15px] md:text-[16px]
              shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000]
              transition-all duration-150
              ${
                !isDisabled
                  ? "bg-[#6366F1] text-white active:translate-y-[2px]"
                  : "bg-gray-300 text-black/40 cursor-not-allowed"
              }`}
        >
          {pending || loading ? (
            <Skeleton className="h-5 w-20 mx-auto bg-gray-100/80" />
          ) : (
            buttonLabel
          )}
        </button>

        {tournamentStatus === "COMPLETED" && (
          <Link href={`/mobile/join-quiz/${id}/leaderboard`}>
            <button
              disabled={loading}
              className="w-full mt-4 py-4 rounded-[14px] border-[4px] border-black uppercase font-[900] text-[18px] shadow-[6px_6px_0px_#000] bg-[#6366F1] text-white active:translate-y-[2px]"
            >
              Go To LeaderBoard
            </button>
          </Link>
        )}
      </div>

      <SlideToContinueModal
        isOpen={showSlideModal}
        onClose={() => setShowSlideModal(false)}
        onConfirm={handleSlideConfirm}
      />
    </Wrapper>
  );
}

/* Reusable Info Card */
function InfoCard({
  icon,
  value,
  label,
  bg,
  className,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
  bg: string;
  className?: string;
}) {
  return (
    <div
      className={`
        ${bg}
        rounded-[14px]
        p-3 sm:p-4
        border-[2px] sm:border-[3px]
        border-black
        shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000]
        ${className ? className : ""}
      `}
    >
      <div className="mb-1.5 sm:mb-2 text-lg sm:text-xl">{icon}</div>

      <div className="text-[16px] sm:text-[18px] font-[900] leading-tight">
        {value}
      </div>

      <p className="text-[9px] sm:text-[10px] font-[800] uppercase text-black/60 tracking-wide">
        {label}
      </p>
    </div>
  );
}
