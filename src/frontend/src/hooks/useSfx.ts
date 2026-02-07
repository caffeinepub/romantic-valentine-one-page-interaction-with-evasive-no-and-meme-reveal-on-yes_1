import { useRef, useCallback } from 'react';

interface SoundEffects {
  playYesConfirmation: () => void;
  playCelebration: () => void;
  playNoBoop: () => void;
  playModalClose: () => void;
}

export function useSfx(): SoundEffects {
  const yesAudioRef = useRef<HTMLAudioElement | null>(null);
  const celebrationAudioRef = useRef<HTMLAudioElement | null>(null);
  const noBoopAudioRef = useRef<HTMLAudioElement | null>(null);
  const modalCloseAudioRef = useRef<HTMLAudioElement | null>(null);
  const lastNoBoopTime = useRef<number>(0);
  const lastModalCloseTime = useRef<number>(0);

  // Rate limit for No boop sound (minimum 300ms between plays)
  const NO_BOOP_RATE_LIMIT = 300;
  // Rate limit for modal close sound (minimum 500ms between plays)
  const MODAL_CLOSE_RATE_LIMIT = 500;

  const initAudio = useCallback((ref: React.MutableRefObject<HTMLAudioElement | null>, src: string) => {
    if (!ref.current) {
      try {
        const audio = new Audio(src);
        audio.volume = 0.4; // Conservative default volume
        audio.preload = 'auto';
        ref.current = audio;
      } catch (error) {
        // Graceful degradation - audio creation failed
        console.warn('Failed to create audio:', error);
      }
    }
    return ref.current;
  }, []);

  const playYesConfirmation = useCallback(() => {
    const audio = initAudio(yesAudioRef, '/assets/generated/sfx-yes-confirmation.mp3');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Graceful degradation - playback failed (e.g., autoplay restrictions)
      });
    }
  }, [initAudio]);

  const playCelebration = useCallback(() => {
    const audio = initAudio(celebrationAudioRef, '/assets/generated/sfx-celebration.mp3');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Graceful degradation - playback failed
      });
    }
  }, [initAudio]);

  const playNoBoop = useCallback(() => {
    const now = Date.now();
    if (now - lastNoBoopTime.current < NO_BOOP_RATE_LIMIT) {
      // Rate-limited, skip this play
      return;
    }
    lastNoBoopTime.current = now;

    const audio = initAudio(noBoopAudioRef, '/assets/generated/sfx-no-boop.mp3');
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Graceful degradation - playback failed
      });
    }
  }, [initAudio]);

  const playModalClose = useCallback(() => {
    const now = Date.now();
    if (now - lastModalCloseTime.current < MODAL_CLOSE_RATE_LIMIT) {
      // Rate-limited, skip this play
      return;
    }
    lastModalCloseTime.current = now;

    // Reuse the no-boop sound for modal close (soft, non-intrusive)
    const audio = initAudio(modalCloseAudioRef, '/assets/generated/sfx-no-boop.mp3');
    if (audio) {
      audio.volume = 0.3; // Even softer for close action
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Graceful degradation - playback failed
      });
    }
  }, [initAudio]);

  return {
    playYesConfirmation,
    playCelebration,
    playNoBoop,
    playModalClose,
  };
}
