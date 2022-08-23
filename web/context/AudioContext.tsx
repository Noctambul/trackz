import { useIpfs } from "hooks/useIpfs";
import { Howl } from "howler";
import Trackz from "models/trackz";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  duration: number;
  trackProgress: number;
  currentTrackz: Trackz | undefined;
  volume: number;
  setVolume: (volume: number) => void;
  play: (trackz?: Trackz) => void;
  pause: () => void;
  onSearch: (seconds: number) => void;
  onSearchEnd: () => void;
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
  const howlerRef = useRef<Howl>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const [isPlaying, setIsplaying] = useState(false);
  const [duration, setDuration] = useState(220);
  const [trackProgress, setTrackProgress] = useState(0);
  const [currentTrackz, setCurrentTrackz] = useState<Trackz>();
  const [volume, setVolume] = useState(1);

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     // audioRef.current?.pause();
  //     // TODO: Remove Timer here
  //   };
  // });

  useEffect(() => {
    howlerRef.current?.volume(volume);
  }, [volume]);

  useEffect(() => {
    if (currentTrackz) {
      howlerRef.current?.stop();
      howlerRef.current = new Howl({
        src: [resolveLink(currentTrackz.musicUri)],
        volume: volume,
      });

      setDuration(currentTrackz.duration);
      setTrackProgress(Math.round(howlerRef.current.seek()));
      setIsplaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackz]);

  useEffect(() => {
    if (isPlaying) {
      if (!howlerRef.current?.playing()) {
        howlerRef.current?.play();
        startTimer();
      }
    } else if (howlerRef.current) {
      howlerRef.current.pause();
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
      // TODO: Use howler.on("end", ..)
      // https://stackoverflow.com/questions/41003367/correct-way-to-call-howler-onend-method

      // if (audioRef.current.ended) {
      //   toNextTrack();
      // } else

      if (howlerRef.current) {
        setTrackProgress(Math.round(howlerRef.current.seek()));
      }
    }, 500);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const onSearch = (value: number) => {
    stopTimer();
    howlerRef.current?.seek(value);
    setTrackProgress(howlerRef.current?.seek() || 0);
  };

  const onSearchEnd = () => {
    if (!isPlaying) {
      setIsplaying(true);
    }
    startTimer();
  };

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
        onSearch,
        onSearchEnd,
        volume,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
