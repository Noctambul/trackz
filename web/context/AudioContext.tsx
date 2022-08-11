import Trackz from "models/trackz";
import { createContext, useEffect, useRef, useState } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  play: (trackz: Trackz) => void;
  pause: () => void;
  previousTrack: () => void;
  nextTrack: () => void;
}

export const AudioContext = createContext<AudioContextInterface | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setIsplaying] = useState(false);
  const [duration, setDuration] = useState(220);
  const [currentTime, setCurrentTime] = useState(122);
  const [trackz, setTrackz] = useState<Trackz>();

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current.pause();
      // TODO: Remove Timer here
    };
  });

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const play = (trackz?: Trackz) => {
    if (trackz) {
      audioRef.current.src = trackz.musicUri;
    }

    setIsplaying(true);
    console.log(`Play ${trackz?.title}`);
  };

  const pause = () => {
    setIsplaying(true);
    console.log("Pause");
  };

  const previousTrack = () => console.log("Previous");
  const nextTrack = () => console.log("Next");

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        play,
        pause,
        nextTrack,
        previousTrack,
        duration,
        currentTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
