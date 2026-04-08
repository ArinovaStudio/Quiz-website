import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, X } from "lucide-react";
interface ConfirmDialogProps {
  open: boolean;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ open, loading, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="border-2 border-foreground shadow-neo-lg bg-background max-w-md">
        <DialogHeader>
          <div className="mx-auto w-16 h-16 border-2 border-foreground bg-destructive/20 flex items-center justify-center mb-4">
            <Trash2 className="w-8 h-8 text-destructive" />
          </div>
          <DialogTitle className="text-center text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-center" style={{ fontFamily: "'Space Mono', monospace" }}>
            This will permanently delete your account and remove all associated data. There is no going back.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 border-2 border-foreground shadow-neo hover:shadow-neo-lg transition-all bg-secondary text-secondary-foreground font-bold"
          >
            <X className="mr-2 w-4 h-4" />Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 border-2 border-foreground shadow-neo hover:shadow-neo-lg hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all bg-destructive text-destructive-foreground font-bold"
          >
            {loading ? <Loader2 className="animate-spin" /> : <><Trash2 className="mr-2 w-4 h-4" />Delete Forever</>}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}