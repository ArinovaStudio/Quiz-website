import Link from "@/components/AppLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { colorMap } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
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
}

export default function CategoryCard({
  redirectBase,
  color,
  category,
  onClick,
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
         <div className="relative w-full h-22 rounded-b-lg overflow-hidden">
           <Image
             src={category.image || "/sports.png"}
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
