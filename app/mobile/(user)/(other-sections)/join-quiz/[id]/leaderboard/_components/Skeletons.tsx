import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function Top3Skeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="px-4 pt-6 pb-4"
    >
      <div className="relative rounded-[20px] border-[4px] border-black bg-gradient-to-b from-amber-100 to-amber-50 min-h-[200px] flex flex-col justify-end shadow-[8px_8px_0px_#000]">
        
        <div className="absolute top-3 left-0 right-0 text-center text-[12px] font-[800] uppercase text-black/70">
          Winners
        </div>

        <div className="flex md:items-end max-md:items-center justify-center max-md:flex-col md:gap-10 pb-6 pt-14 px-2">
          
          {[1,2,3].map((i) => (
            <div
              key={i}
              className="flex flex-col items-center w-[110px]"
            >
              {/* Avatar / icon */}
              <Skeleton className="w-16 h-16 rounded-full border-[3px] border-black mb-3 shadow-[4px_4px_0px_#000]" />

              {/* Card */}
              <div className="rounded-[14px] border-[3px] border-black px-3 py-2 bg-white shadow-[5px_5px_0px_#000] flex flex-col items-center gap-2 w-full">
                <Skeleton className="h-3 w-[70px]" />
                <Skeleton className="h-3 w-[50px]" />
                <Skeleton className="h-3 w-[40px]" />
              </div>

              {/* Rank */}
              <Skeleton className="mt-2 h-6 w-10 rounded-[8px] border-[2px] border-black" />
            </div>
          ))}

        </div>
      </div>
    </motion.div>
  );
}

export function LeaderboardListSkeleton() {
  return (
    <div className="rounded-[14px] border-[3px] border-black bg-white overflow-hidden shadow-[5px_5px_0px_#000]">
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center gap-3 px-4 py-3 border-b-[2px] border-black last:border-b-0"
        >
          {/* Rank */}
          <Skeleton className="w-8 h-4" />

          {/* Player info */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[140px]" />

            <div className="flex items-center gap-3">
              <Skeleton className="h-3 w-[70px]" />
              <Skeleton className="h-3 w-[50px]" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}