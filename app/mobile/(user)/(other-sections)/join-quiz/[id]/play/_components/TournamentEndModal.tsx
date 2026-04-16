"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { CalendarClock } from "lucide-react"

interface TournamentEndModalProps {
  open: boolean
  endDateTime: string
  redirectAfter?: number
  redirectTo?: string
}

export default function TournamentEndModal({
  open,
  endDateTime,
  redirectAfter = 5,
  redirectTo = "/",
}: TournamentEndModalProps) {
  const [seconds, setSeconds] = useState(redirectAfter)
  const router = useRouter()

  useEffect(() => {
    if (!open) return

    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          router.push(redirectTo)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [open, router, redirectTo])
  // const endDate = (new Date(endDateTime)).toLocaleDateString().replaceAll("/","-");
  // const endTime = (new Date(endDateTime)).toLocaleTimeString();
  const iso = endDateTime;

  let endTime = "";
  let endDate = "";

  if (iso) {
    const hours = parseInt(iso.slice(11, 13));
    const minutes = iso.slice(14, 16);

    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;

    endTime = `${formattedHours}:${minutes} ${ampm}`;

    endDate = `${iso.slice(8, 10)}-${iso.slice(5, 7)}-${iso.slice(0, 4)}`;
  }
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl [&>button]:hidden">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <CalendarClock size={22} />
            <DialogTitle className="text-xl font-semibold">
              Tournament Schedule
            </DialogTitle>
          </div>

          <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
            This tournament will officially conclude on the date and time
            mentioned below. You will be able to view the leaderboard and final
            results once the event has ended.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted/50 border rounded-xl p-4 mt-3">
          <p className="text-sm">
            <span className="font-semibold">Tournament Ends:</span> {endDate} ,{endTime}
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Redirecting in
          </p>

          <p className="text-3xl font-bold text-primary mt-1">
            {seconds}s
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}