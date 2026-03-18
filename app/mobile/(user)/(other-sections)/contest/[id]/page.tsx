"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import { QuizCard, QuizCardSkeleton } from "../_components/QuizCard";
import { useEffect, useMemo, useState } from "react";
import { colorMap } from "@/lib/constants";
import SpecialIcon from "@/components/SpecialIcon";
import { ArrowLeft, Filter, Loader2 } from "lucide-react";
import useGoBack from "@/components/GoBack";
import useSWRInfinite from "swr/infinite";
import { useInfiniteScroll } from "@/components/useInfiniteScroll";
import { LANGUAGES } from "@/lib/constants";
export default function page() {
  const { id } = useParams();
  const [filterOpen, setFilterOpen] = useState(false); 
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const { data, isLoading, error } = useSWR(
    `/api/user/tournaments/${id}`,
    fetcher,
    { revalidateOnFocus: false }
  );
  const filters = [
    { id: "all", label: "All Contests" },
    { id: "high", label: "High Stakes (₹2L+)",type:"price" },
    { id: "medium", label: "Medium (₹50K-₹2L)",type:"price" },
    { id: "low", label: "Beginner (Under ₹50K)",type:"price" },
    ...LANGUAGES.map((language)=>{
        return {id: language,label: language,type: "language"}
    })
  ];
  const [isShrunk, setIsShrunk] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      setIsShrunk((prev) => {
        if (!prev && scrollValue > 80) return true;
        if (prev && scrollValue < 40) return false;
        return prev;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const {
    data: rdata,
    isLoading: recommendationsLoading,
    error: RecommendationsError,
    observerRef,
    hasMore,
    isValidating,
  } = useInfiniteScroll({
    endpoint: `/api/user/tournaments/${id}/recommended-events`,
    fetcher,
  });
  const recommendations = rdata
    ? rdata.flatMap((item: any) => item.tournaments)
    : [];
  const filteredRecommendations = useMemo(() => {
    if (selectedFilter === "low") {
      return recommendations.filter((event: any) => {
        return event.prizePool < 50000;
      });
    } else if (selectedFilter === "medium") {
      return recommendations.filter((event: any) => {
        return event.prizePool >= 50000 && event.prizePool <= 200000;
      });
    } else if (selectedFilter === "high") {
      return recommendations.filter((event: any) => {
        return event.prizePool >= 200000;
      });
    }else if(LANGUAGES.includes(selectedFilter)){
      return recommendations.filter((event)=>{
        return event.language === selectedFilter
      });
    }
    return recommendations;
  }, [recommendations, selectedFilter]);
  const item = !isLoading && data?.tournament;
  const goBack = useGoBack();
  return (
    <div className="w-full space-y-4 min-h-screen">
      <div className="sticky top-0 z-100 bg-gray-100 max-h-120 overflow-hidden">
        <div
          className={`min-h-[80px] 
                    flex flex-col justify-between 
                    p-3 md:p-4
                    gap-4
                    ${colorMap["amber"]} 
                    border-b-6 md:border-b-8 border-black 
                    w-full`}
        >
          <div className="flex items-center justify-between">
            <div className="flex justify-start flex-1 gap-3 items-center">
              <SpecialIcon Icon={ArrowLeft} onClick={goBack} />

              <span
                className="text-base
                           font-extrabold uppercase 
                           leading-tight 
                           break-words md:whitespace-nowrap"
              >
                contest details
              </span>
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className={`w-[48px] h-[48px] rounded-[12px] border-[3px] border-black flex items-center justify-center ${
                filterOpen ? "bg-[#A78BFA]" : "bg-white"
              }`}
              style={{
                boxShadow: "3px 3px 0px #000000",
              }}
            >
              <Filter className="w-5 h-5 stroke-[3px]" />
            </button>
          </div>
          {/* Filter Dropdown */}
          {filterOpen && (
            <div className="px-2 pb-4">
              <div
                className="bg-white rounded-[12px] border-[3px] border-black p-3"
                style={{
                  boxShadow: "4px 4px 0px #000000",
                }}
              >
                <p className="text-[12px] font-[800] uppercase mb-2 text-black/60">
                  Filter by Prize
                </p>
                <div className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => {
                        setSelectedFilter(filter.id);
                        setFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-[8px] border-[2px] border-black text-[13px] font-[800] uppercase transition-all ${
                        selectedFilter === filter.id
                          ? "bg-[#A5F3FC]"
                          : "bg-white hover:bg-gray-50"
                      }`}
                      style={{
                        boxShadow:
                          selectedFilter === filter.id
                            ? "2px 2px 0px #000000"
                            : "none",
                      }}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="my-5 mx-2 space-y-3 ">
          <div className="flex justify-between items-center">
            <div className="text-sm sm:text-base md:text-2xl font-extrabold uppercase">
              🏆 Highest Prizes
            </div>
            <div
              className="bg-[#6366F1] text-white px-3 py-1 rounded-[8px] border-[2px] border-black text-[9px] sm:text-[10px] font-[900] uppercase"
              style={{ boxShadow: "2px 2px 0px #000000" }}
            >
              Featured
            </div>
          </div>
          <ErrorLoading
            error={error}
            loadingCard={QuizCardSkeleton}
            loadingCount={1}
            loading={isLoading}
            dataLength={item ? 1 : 0}
            emptyMessage="Tournament Does Not Exist!"
          >
            <QuizCard {...item} index={0} shrunk={isShrunk} />
          </ErrorLoading>
        </div>
      </div>
      <div className="grid gap-4 mx-3">
        <div className="uppercase text-sm sm:text-base md:text-2xl font-extrabold">
          MORE CONTESTS ({filteredRecommendations?.length ?? 0})
        </div>

        <div className="grid gap-2">
          <ErrorLoading
            error={RecommendationsError}
            loadingCard={QuizCardSkeleton}
            loadingCount={5}
            loading={recommendationsLoading}
            dataLength={filteredRecommendations?.length}
            emptyMessage="No Related Tournaments Found!"
          >
            {filteredRecommendations?.map(
              (quiz: any, index: number) =>
                quiz.id !== item?.id && (
                  <QuizCard key={quiz.id} {...quiz} index={index} />
                )
            )}
          </ErrorLoading>
            {!isLoading && isValidating && (
              <div className="w-full">
                <Loader2 size={20} className="mx-auto animate-spin" />
              </div>
            )}
            <div ref={observerRef} />
        </div>
      </div>
    </div>
  );
}
