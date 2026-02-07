import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { CelebrationModal } from '@/components/CelebrationModal';
import { useSfx } from '@/hooks/useSfx';

export default function App() {
  const [answered, setAnswered] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [noButtonSide, setNoButtonSide] = useState<'left' | 'right'>('right');
  const [noAttempts, setNoAttempts] = useState(0);
  const [showNoPopup, setShowNoPopup] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playYesConfirmation, playCelebration, playNoBoop, playModalClose } = useSfx();

  const cuteEmojis = ['🥺', '🥹', '😢', '😭', '💔', '🙏', '😿', '🥲'];

  const handleNoAttempt = (e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Play boop sound (rate-limited)
    playNoBoop();
    
    // Toggle side
    setNoButtonSide(prev => prev === 'left' ? 'right' : 'left');
    
    // Increment attempts and show popup
    setNoAttempts(prev => prev + 1);
    setShowNoPopup(true);
    
    // Hide popup after 2 seconds
    setTimeout(() => {
      setShowNoPopup(false);
    }, 2000);
  };

  const handleYesClick = () => {
    // Play confirmation sound
    playYesConfirmation();
    
    setAnswered(true);
    setShowCelebration(true);
    
    // Play celebration sound from the same user gesture
    playCelebration();
  };

  const handleCloseCelebration = () => {
    // Play close sound
    playModalClose();
    setShowCelebration(false);
  };

  if (answered) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center bg-rose-gradient p-6 pb-32 relative overflow-hidden">
          {/* Rose pattern background */}
          <div className="absolute inset-0 rose-pattern-bg opacity-20" />
          
          <div className="text-center space-y-8 animate-in fade-in duration-700 relative z-10">
            <div className="space-y-4">
              <Heart className="w-20 h-20 mx-auto text-rose-primary fill-rose-primary animate-pulse" />
              <h1 className="text-5xl md:text-6xl font-bold text-rose-dark tracking-tight">
                Good choice ❤️
              </h1>
            </div>
            
            <div className="relative max-w-2xl mx-auto">
              {/* Sparkle effect container */}
              <div className="sparkle-container">
                <div className="sparkle sparkle-1"></div>
                <div className="sparkle sparkle-2"></div>
                <div className="sparkle sparkle-3"></div>
                <div className="sparkle sparkle-4"></div>
                <div className="sparkle sparkle-5"></div>
                <div className="sparkle sparkle-6"></div>
              </div>
              
              {/* Image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-primary/30 bg-white">
                <img
                  src="/assets/generated/stick-figures-rose-only-animated.dim_1024x1024.gif"
                  alt="A male stick figure giving a rose to a female stick figure"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Bottom love message */}
          <div className="fixed bottom-0 left-0 right-0 pb-safe z-10">
            <div className="bg-gradient-to-t from-rose-primary/95 to-rose-primary/80 backdrop-blur-lg py-6 px-6 text-center border-t-4 border-white/30">
              <p className="text-white text-2xl md:text-3xl font-bold mb-2">
                Love you 💕
              </p>
              <p className="text-white/95 text-xl md:text-2xl font-semibold">
                Happy Rose Day kannu 🌹
              </p>
            </div>
          </div>
        </div>

        <CelebrationModal open={showCelebration} onClose={handleCloseCelebration} />
      </>
    );
  }

  const currentEmoji = cuteEmojis[noAttempts % cuteEmojis.length];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-gradient p-6 overflow-hidden relative">
      {/* Rose pattern background */}
      <div className="absolute inset-0 rose-pattern-bg opacity-15" />
      
      {/* No attempt popup */}
      {showNoPopup && (
        <div className="fixed top-1/4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top duration-300 pointer-events-none">
          <div className="bg-rose-primary/95 backdrop-blur-lg text-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-white/30">
            <p className="text-2xl md:text-3xl font-bold text-center">
              Please accept Yes {currentEmoji}
            </p>
          </div>
        </div>
      )}

      <div className="text-center space-y-12 max-w-3xl mx-auto relative z-10">
        <div className="space-y-6 animate-in fade-in slide-in-from-top duration-700">
          <div className="flex justify-center gap-3">
            <span className="text-6xl animate-bounce" style={{ animationDelay: '0ms' }}>🌹</span>
            <span className="text-7xl animate-bounce" style={{ animationDelay: '150ms' }}>🌹</span>
            <span className="text-6xl animate-bounce" style={{ animationDelay: '300ms' }}>🌹</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-rose-dark tracking-tight leading-tight">
            Will you accept
            <span className="block text-rose-primary mt-2">my rose?</span>
          </h1>
        </div>

        <div 
          ref={containerRef}
          className="relative h-32 w-full max-w-2xl mx-auto"
        >
          {/* Yes Button - Fixed left position */}
          <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2">
            <Button
              onClick={handleYesClick}
              size="lg"
              className="text-xl md:text-2xl px-12 md:px-16 py-8 md:py-10 h-auto rounded-full bg-rose-primary hover:bg-rose-primary/90 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold border-4 border-white/50"
            >
              Yes! 🌹
            </Button>
          </div>

          {/* No Button - Toggles between left and right */}
          <div
            className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out ${
              noButtonSide === 'left' ? 'left-8 md:left-16' : 'right-8 md:right-16'
            }`}
            onPointerEnter={handleNoAttempt}
            onPointerDown={handleNoAttempt}
            onTouchStart={handleNoAttempt}
          >
            <Button
              size="lg"
              variant="outline"
              className="text-xl md:text-2xl px-12 md:px-16 py-8 md:py-10 h-auto rounded-full border-4 border-rose-muted/50 text-rose-muted hover:border-rose-muted hover:text-rose-muted hover:bg-white/50 shadow-lg font-semibold cursor-pointer bg-white/80 backdrop-blur-sm"
            >
              No
            </Button>
          </div>
        </div>

        <p className="text-rose-muted/70 text-lg md:text-xl italic animate-in fade-in duration-1000 delay-500">
          Choose wisely... 🌹💕
        </p>
      </div>

      <footer className="fixed bottom-6 text-center text-sm text-rose-muted z-10">
        © 2026. Built with <Heart className="inline w-4 h-4 text-rose-primary fill-rose-primary" /> using{' '}
        <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="underline hover:text-rose-primary transition-colors">
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
