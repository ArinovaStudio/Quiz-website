export const colorMap: any = {
  yellow: "bg-[#FDE68A]",
  green: "bg-[#A5F3A0]",
  pink: "bg-[#A78BFA]",
  amber: "bg-[#FFDB58]",
  blue: "bg-[#A5F3FC]",
  "sky-blue": "bg-blue-200",
  purple: "bg-[#A78BFA]",
  // new colors
  mint: "bg-[#CFFFE5]",
  lavender: "bg-[#E6D7FF]",
  peach: "bg-[#FFD6C9]",
  coral: "bg-[#FFC1B6]",
  lime: "bg-[#D9F99D]",
  teal: "bg-[#B2F5EA]",
  rose: "bg-[#FFE4E6]",
  indigo: "bg-[#C7D2FE]",
  cyan: "bg-[#CFFAFE]",
  orange: "bg-[#FED7AA]",
  fuchsia: "bg-[#F5D0FE]",
  emerald: "bg-[#A7F3D0]",
  danger: "bg-[#FCA5A5]"
};
export const SITE_NAME = "Olobix";

export const difficultyColors: any = {
  EASY: "bg-green-600",
  MEDIUM: "bg-yellow-500",
  HARD: "bg-red-500",
  EXPERT: "bg-red-900",
};

export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|icloud\.com)$/;

export const LANGUAGES = ["ENGLISH", "HINDI", "HINGLISH"];

export function getFormattedRank(rank: number) {
  return `${rank}${
    rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th"
  }`;
}
