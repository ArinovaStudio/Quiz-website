import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface QuizCardProps {
  event: any;
  index?: number;
  getDate: any;
}

export default function PlayedQuizCard({ event, index = 0, getDate }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5 * (index + 0.5),
        ease: "easeOut",
      }}
      className="rounded-[14px] border-[3px] border-black p-4 bg-white shadow-[4px_4px_0px_black]"
    >
      <p className="text-[15px] font-[900] uppercase mb-2">
        {event?.tournament?.title}
      </p>

      <p className="text-[11px] font-[700] text-black/60 mb-3">
        {getDate(event?.tournament?.startTime)}
      </p>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 bg-[#A5F3A0] px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800]">
          <Award className="w-3.5 h-3.5" />
          {event?.score ?? 0}/{event?.tournament?.totalQuestions}
        </span>

        {event?.rank && (
          <span className="inline-flex items-center gap-1 bg-[#A5F3FC] px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800]">
            Rank #{event.rank}
          </span>
        )}

        {event?.prize > 0 && (
          <span className="inline-flex items-center gap-1 bg-[#FFDB58] px-2 py-1 rounded-[6px] border-[2px] border-black text-[11px] font-[800]">
            Won ₹{event.prize}
          </span>
        )}
      </div>
    </motion.div>
  );
}
export function PlayedQuizCardSkeleton({ index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5 * (index + 0.5),
        ease: "easeOut",
      }}
      className="rounded-[14px] border-[3px] border-black p-4 bg-white shadow-[4px_4px_0px_black]"
    >
      {/* Title */}
      <Skeleton className="h-4 w-[70%] mb-2" />

      {/* Date */}
      <Skeleton className="h-3 w-[120px] mb-3" />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-[90px] rounded-[6px] border-[2px] border-gray-300" />
        <Skeleton className="h-6 w-[70px] rounded-[6px] border-[2px] border-gray-300" />
        <Skeleton className="h-6 w-[80px] rounded-[6px] border-[2px] border-gray-300" />
      </div>
    </motion.div>
  );
}
