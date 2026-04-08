import { AlertTriangle, HelpCircle, BookOpen } from "lucide-react";

export function DeleteAccountIllustration() {
  return (
    <div className="bg-secondary flex flex-col items-center justify-center p-8 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-6 left-6 w-10 h-10 border-2 border-foreground bg-highlight shadow-neo flex items-center justify-center rotate-12">
        <HelpCircle className="w-5 h-5 text-highlight-foreground" />
      </div>
      <div className="absolute bottom-8 right-8 w-10 h-10 border-2 border-foreground bg-info shadow-neo flex items-center justify-center -rotate-6">
        <BookOpen className="w-5 h-5 text-info-foreground" />
      </div>
      <div className="absolute top-12 right-10 w-6 h-6 border-2 border-foreground bg-warning rotate-45" />
      <div className="absolute bottom-16 left-10 w-4 h-4 border-2 border-foreground bg-accent rotate-12" />

      <div className="w-28 h-28 border-2 border-foreground bg-destructive/20 shadow-neo-lg flex items-center justify-center mb-8">
        <AlertTriangle className="w-14 h-14 text-destructive" />
      </div>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Delete Account
      </h1>
      <p className="text-muted-foreground text-center max-w-xs leading-relaxed text-sm" style={{ fontFamily: "'Space Mono', monospace" }}>
        This action is permanent and cannot be undone. All your data, settings, and history will be erased forever.
      </p>
      <div className="mt-8 flex gap-3">
        <div className="w-4 h-4 border-2 border-foreground bg-highlight" />
        <div className="w-4 h-4 border-2 border-foreground bg-info" />
        <div className="w-4 h-4 border-2 border-foreground bg-warning" />
      </div>
    </div>
  );
}