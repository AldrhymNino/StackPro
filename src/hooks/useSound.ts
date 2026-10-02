import { useCallback, useEffect, useRef, useState } from "react";

type UseSoundOptions = {
  volume?: number;
  muted?: boolean;
};

const useSound = (src: string, options?: UseSoundOptions) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);

  const [muted, setMuted] = useState(options?.muted ?? false);
  const [volume, setVolume] = useState(options?.volume ?? 0.6);

  useEffect(() => {
    const audio = new Audio(src);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current || unlockedRef.current) return;

      const audio = audioRef.current;

      audio
        .play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          unlockedRef.current = true;
        })
        .catch(() => {});

      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("click", unlockAudio);

    return () => {
      window.removeEventListener("click", unlockAudio);
    };
  }, []);

  const play = useCallback(() => {
    if (!audioRef.current || muted) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [muted]);

  return {
    play,
    muted,
    setMuted,
    volume,
    setVolume,
  };
};

export { useSound };
