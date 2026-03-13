"use client";
import Link from "@/components/AppLink";
import CategoryCard, { CategoryCardSkeleton } from "@/components/CategoryCard";
import CustomSwiper from "@/components/CustomSwiper";
import ErrorLoading from "@/components/ErrorLoading";
import { colorMap } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { ArrowRight } from "lucide-react";
import useSWR from "swr";
interface Props {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategorySection({ selected, setSelected }: Props) {
  const { data, isLoading, error } = useSWR("/api/categories/", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const colors = Object.keys(colorMap);
  const categories = data?.categories?.slice(0,5) ?? [];
  return (
    <div className="space-y-3 mt-3 sm:space-y-4 px-1 sm:px-0">
      {/* Header */}
      <div className="flex uppercase text-lg sm:text-2xl font-extrabold justify-between items-center">
        <div className="tracking-wide">categories</div>
        <div className="text-xs text-primary">
          <Link href={"/mobile/categories"}>View ALl Categories</Link>
        </div>
      </div>

      {/* Swiper */}
      <div className="max-w-full overflow-hidden grid">
        <ErrorLoading
          loading={isLoading}
          error={error}
          loadingCard={CategoryCardSkeleton}
          loadingCount={4}
          loadingCols={4}
          loadingRows={1}
          dataLength={categories.length}
          emptyMessage="No Categories Found!"
        >
          <CustomSwiper>
            {categories &&
              [
                { name: "defaulttype" },
                ...categories,
                { name: "view_all_123" },
              ].map((cat: any, index: number) =>
                cat.name === "defaulttype" ? (
                  <CategoryCard
                    key="all"
                    name="all"
                    image={cat?.image}
                    onClick={() => setSelected("all")}
                    id={"all"}
                    selected={selected === "all"}
                    color={colors[2]}
                    eventsCount={categories.reduce(
                      (acc: number, item: any) =>
                        acc + (item?.tournamentsSize ?? 0),
                      0
                    )}
                  />
                ) : cat.name === "view_all_123" ? (
                  <Link href={"/mobile/categories"}>
                    <div className="shadow-sm border h-full rounded-lg bg-background flex items-center justify-center">
                      <span className="text-primary items-center gap-1 flex text-sm">
                        View All <ArrowRight size={17} />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <CategoryCard
                    key={cat.id}
                    id={cat.id}
                    selected={selected === cat.id}
                    onClick={() => setSelected(cat.id)}
                    name={cat.name}
                    image={cat.image}
                    eventsCount={cat?.tournamentsSize}
                    color={colors[index % colors.length]}
                  />
                )
              )}
          </CustomSwiper>
        </ErrorLoading>
      </div>
    </div>
  );
}
