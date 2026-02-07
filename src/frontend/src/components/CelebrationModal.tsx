import { useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';

interface CelebrationModalProps {
  open: boolean;
  onClose: () => void;
}

export function CelebrationModal({ open, onClose }: CelebrationModalProps) {
  useEffect(() => {
    if (open) {
      // Trigger confetti animation when modal opens
      const confettiContainer = document.getElementById('confetti-container');
      if (confettiContainer) {
        confettiContainer.classList.add('active');
      }
    }
  }, [open]);

  return (
    <>
      {/* Confetti container */}
      {open && (
        <div id="confetti-container" className="confetti-container">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: [
                  'oklch(var(--rose-primary))',
                  'oklch(var(--rose-accent))',
                  '#FFD700',
                  '#FF69B4',
                  '#FFC0CB',
                  '#FF1493',
                  '#DC143C',
                  '#FF6B9D',
                ][Math.floor(Math.random() * 8)],
              }}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-lg border-4 border-rose-primary/30 rounded-3xl shadow-2xl">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 rounded-full hover:bg-rose-light"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-rose-muted" />
          </Button>

          <div className="flex flex-col items-center justify-center space-y-6 py-8 px-4">
            <div className="relative">
              <Heart className="w-24 h-24 text-rose-primary fill-rose-primary animate-pulse" />
              <div className="absolute inset-0 animate-ping opacity-30">
                <Heart className="w-24 h-24 text-rose-primary fill-rose-primary" />
              </div>
            </div>

            <DialogTitle className="text-3xl md:text-4xl font-bold text-rose-dark text-center leading-tight">
              🎉 Party Time! 🎉
            </DialogTitle>

            <DialogDescription className="text-xl md:text-2xl text-rose-accent font-medium text-center px-2 leading-relaxed">
              Thank you for accepting the rose — you are now finally mine
            </DialogDescription>

            <div className="flex gap-2 pt-4">
              <span className="text-3xl animate-bounce" style={{ animationDelay: '0ms' }}>🌹</span>
              <span className="text-3xl animate-bounce" style={{ animationDelay: '100ms' }}>💕</span>
              <span className="text-3xl animate-bounce" style={{ animationDelay: '200ms' }}>🌹</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
