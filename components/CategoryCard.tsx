import { colorMap } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
interface CategoryCardProps {
  id: string | null;
  name: string;
  image: string;
  color: string;
  eventsCount?: number;
  selected?: boolean;
  onClick?: () => void;
}

export default function CategoryCard({
  id,
  name,
  image,
  color,
  selected = false,
  onClick,
  eventsCount,
}: CategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${color && colorMap[color]} 
        flex-shrink-0
        w-full h-full!
        rounded-lg
        border-[3px]
        overflow-hidden
        text-center
        max-w-[85px]
        relative!
        border-5
        border-foreground
        transition-all duration-300
        hover:scale-102
        active:scale-101
        focus:outline-none focus:ring-4 focus:ring-black/20
        pb-1
      `}
      style={{
        boxShadow: "5px 5px 0px #000000",
      }}
    >
      {/* Avatar */}
      <div className="relative w-full h-22 rounded-b-lg overflow-hidden">
        <Image
          src={image || "/sports.png"}
          className="object-cover"
          alt={"Image"}
          fill
        />
      </div>

      {/* Event Count */}
      <div className="absolute bottom-7 sm:bottom-8 left-1">
        <p
          className={`
            text-[10px]
            font-[900]
            uppercase
            leading-tight
            w-7
            truncate
            bg-foreground/60
            text-background
            rounded-full
          `}
        >
          {eventsCount}
        </p>
      </div>

      {/* Event Name */}
      <div>
        <p
          className="
            font-[900]
            px-2
            pb-1
            pt-[5px]
            text-[9px]
            sm:text-xs
            uppercase
            text-background
            leading-tight
            rounded-xl
            truncate
            pb-1
          "
        >
          {name}
        </p>
      </div>
    </button>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div
      className="
        flex-shrink-0
        w-full h-full
        rounded-lg
        border-[3px]
        max-w-[85px]!
        max-h-[120px]
        border-foreground
        overflow-hidden
        relative
        pb-1
      "
      style={{
        boxShadow: "5px 5px 0px #000000",
      }}
    >
      {/* Image Skeleton */}
      <div className="relative w-full h-22 overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-400/10 rounded-b-lg" />
      </div>

      {/* Event Count Skeleton */}
      <div className="absolute bottom-7 sm:bottom-8 left-1">
        <Skeleton className="h-4 w-7 bg-gray-400/10 rounded-full" />
      </div>

      {/* Event Name Skeleton */}
      <div className="px-2 pt-[5px] pb-1 flex justify-center">
        <Skeleton className="h-3 w-14 bg-gray-400/10 rounded-md" />
      </div>
    </div>
  );
}


