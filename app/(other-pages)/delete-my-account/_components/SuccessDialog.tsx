import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="border-2 border-foreground shadow-neo-lg bg-background max-w-md">
        <DialogHeader>
          <div className="mx-auto w-20 h-20 border-2 border-foreground bg-accent flex items-center justify-center mb-4">
            <Frown className="w-10 h-10 text-accent-foreground" strokeWidth={1.5} />
          </div>
          <DialogTitle className="text-center text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            We're sad to see you go
          </DialogTitle>
          <DialogDescription className="text-center space-y-3" style={{ fontFamily: "'Space Mono', monospace" }}>
            <span className="block">Your account has been successfully deleted.</span>
            <span className="block text-muted-foreground text-xs">
              All your data has been permanently removed from our servers. If you ever change your mind, you're always welcome back.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center mt-4">
          <Button
            onClick={onClose}
            className="border-2 border-foreground shadow-neo hover:shadow-neo-lg transition-all bg-primary text-primary-foreground font-bold px-8"
          >
            Goodbye 👋
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}