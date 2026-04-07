import Link from "@/components/AppLink";
import { colorMap } from "@/lib/constants";
import Image from "next/image";
export interface Category {
  id: string | null;
  name: string;
  image: string;
  tournamentsSize?: number;
}

interface CategoryCardProps {
  redirectBase: string;
  color: string;
  category: Category;
  selected?: boolean;
  onClick?: () => void;
  isInside?: boolean
}

export default function CategoryCard({
  redirectBase,
  color,
  category,
  onClick
}: CategoryCardProps) {
  const { name, image, tournamentsSize } = category;

  return (
    <Link className="w-full" href={`${redirectBase}/${category.id}`}>
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
         <div className={`relative w-full h-30 rounded-b-lg overflow-hidden`}>
           <Image
             src={category.image || "/sports.png"}
             className="object-cover"
             alt={"Image"}
             fill
           />
         </div>
   
         {/* Event Count */}
         <div className={`absolute left-1 bottom-5`}>
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
             {tournamentsSize}
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
    </Link>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export function CategoryCardSkeleton() {
  return (
    <div className="w-full">
      <div
        className="
          flex-shrink-0
          w-full h-full
          rounded-lg
          border-[3px]
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
        <div className="relative w-full h-30 rounded-b-lg overflow-hidden">
          <Skeleton className="bg-gray-200 w-full h-full" />
        </div>

        {/* Event Count Skeleton */}
        <div className="absolute left-1 bottom-5">
          <Skeleton className="bg-gray-300 h-4 w-6 rounded-full" />
        </div>

        {/* Event Name Skeleton */}
        <div className="px-2 pt-[5px] pb-1">
          <Skeleton className="bg-gray-200 h-3 w-3/4 mx-auto" />
        </div>
      </div>
    </div>
  );
}