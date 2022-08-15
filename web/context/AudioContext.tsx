import { useIpfs } from "hooks/useIpfs";
import Trackz from "models/trackz";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  duration: number;
  trackProgress: number;
  currentTrackz: Trackz | undefined;
  play: (trackz?: Trackz) => void;
  pause: () => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
}

let audio: HTMLAudioElement;
if (typeof Audio !== "undefined") {
  audio = new Audio();
}

const AudioContext = createContext<AudioContextInterface | undefined>(
  undefined
);

export function useAudio(): AudioContextInterface {
  if (!AudioContext) throw "AudioContext is undefined";
  return useContext(AudioContext)!;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const { resolveLink } = useIpfs();
  const audioRef = useRef<HTMLAudioElement>(audio);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [isPlaying, setIsplaying] = useState(false);
  const [duration, setDuration] = useState(220);
  const [trackProgress, setTrackProgress] = useState(0);
  const [currentTrackz, setCurrentTrackz] = useState<Trackz>();

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     // audioRef.current?.pause();
  //     // TODO: Remove Timer here
  //   };
  // });

  useEffect(() => {
    if (currentTrackz) {
      audioRef.current.src = resolveLink(currentTrackz?.musicUri);
      audioRef.current.volume = 1;

      setDuration(currentTrackz.duration);
      setTrackProgress(Math.round(audioRef.current.currentTime));
      setIsplaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackz]);

  useEffect(() => {
    console.log("IS_PLAYING ", isPlaying);
    if (isPlaying && audioRef.current.paused) {
      audioRef.current?.play();
      startTimer();
    } else if (!audioRef.current.paused) {
      audioRef.current.pause();
    }
    // Use callback to add starttimer to the dependencies
  }, [isPlaying]);

  const play = (trackz?: Trackz) => {
    if (trackz && trackz != currentTrackz) {
      setIsplaying(false);
      setCurrentTrackz(trackz);
    } else {
      setIsplaying(true);
    }
  };

  const pause = () => {
    setIsplaying(false);
    stopTimer();
  };

  const toPreviousTrack = () => console.log("Previous");
  const toNextTrack = () => console.log("Next");

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(Math.round(audioRef.current.currentTime));
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // const onSearch = (value: number) => {
  // stopTimer()

  //   audioRef.current.currentTime = value;
  //   setTrackProgress(audioRef.current.currentTime);
  // };

  // const onSearchEnd = () => {
  //   if (!isPlaying) {
  //     setIsplaying(true);
  //   }
  //   startTimer();
  // };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        play,
        pause,
        toNextTrack,
        toPreviousTrack,
        currentTrackz,
        duration,
        trackProgress,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
