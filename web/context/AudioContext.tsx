import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useIpfs } from "../hooks/useIpfs";
import Trackz from "../models/trackz";

export interface AudioContextInterface {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  currentTrackz: Trackz | undefined;
  play: (trackz: Trackz) => void;
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
  const [isPlaying, setIsplaying] = useState(false);
  const [duration, setDuration] = useState(220);
  const [currentTime, setCurrentTime] = useState(122);
  const [currentTrackz, setCurrentTrackz] = useState<Trackz>();

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current?.pause();
      // TODO: Remove Timer here
    };
  });

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  const play = (trackz?: Trackz) => {
    if (trackz && audioRef.current) {
      audioRef.current.src = resolveLink(trackz.musicUri);
      setCurrentTrackz(trackz);
    }

    setIsplaying(true);
    console.log(`Play ${trackz?.title}`);
  };

  const pause = () => {
    setIsplaying(false);
    console.log("Pause");
  };

  const toPreviousTrack = () => console.log("Previous");
  const toNextTrack = () => console.log("Next");

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
        currentTime,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
