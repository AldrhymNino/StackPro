import { useEffect, useRef, useState } from 'react';

export const useSound = (
  src: string,
  options?: {
    volume?: number;
    muted?: boolean;
  }
) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const unlockedRef = useRef(false);

  const [muted, setMuted] = useState(options?.muted ?? false);
  const [volume, setVolume] = useState(options?.volume ?? 0.6);

  // Crear el audio una sola vez
  if (!audioRef.current) {
    audioRef.current = new Audio(src);
    audioRef.current.volume = volume;
  }

  // Mantener volumen y mute sincronizados
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
    audioRef.current.muted = muted;
  }, [volume, muted]);

  // 🔓 Desbloqueo de audio (primer click del usuario)
  useEffect(() => {
    const unlockAudio = () => {
      if (!audioRef.current || unlockedRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          audioRef.current?.pause();
          audioRef.current!.currentTime = 0;
          unlockedRef.current = true;
        })
        .catch(() => {});

      window.removeEventListener('click', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
    };
  }, []);

  // ▶️ Play seguro
  const play = () => {
    if (!audioRef.current || muted) return;

    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  return {
    play,
    muted,
    setMuted,
    volume,
    setVolume,
  };
};
