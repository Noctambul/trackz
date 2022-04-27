import {
  TokenMetadata,
  Web3Context,
  Web3ContextInterface,
} from "context/Web3Context";
import { useIpfs } from "hooks/useIpfs";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  currentSongMetadata?: TokenMetadata;
  trackProgress: number;
  duration: number;
  play: (metadata?: TokenMetadata) => void;
  pause: () => void;
  toggle: () => void;
  toPrevTrack: () => void;
  toNextTrack: () => void;
  onSearch: (val: number) => void;
  onSearchEnd: () => void;
  onVolume: (vol: number) => void;
}

export const AudioContext = createContext<AudioContextInterface | null>(null);

let audio: HTMLAudioElement;

if (typeof Audio !== "undefined") {
  audio = new Audio();
}

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolveLink } = useIpfs();
  const audioRef = useRef<HTMLAudioElement>(audio);
  const intervalRef = useRef<NodeJS.Timer>();
  const { tokens } = useContext(Web3Context) as Web3ContextInterface;
  const [volume, setVolume] = useState(1);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongMetadata, setCurrentSongMetadata] =
    useState<TokenMetadata>();

  const { duration } = audioRef.current || { duration: 0 };

  useEffect(() => {
    if (tokens.length > 0) {
      setCurrentSongMetadata(tokens[0]);
    }
  }, [tokens]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown, false);

    return () => {
      document.removeEventListener("keydown", onKeyDown, false);
    };
  }, []);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code == "Space") {
      e.preventDefault();
      setIsPlaying((isPlaying) => {
        toggle(isPlaying);
        return isPlaying;
      });
    }
  };

  const play = (metadata?: TokenMetadata) => {
    if (!isPlaying && audioRef.current) {
      if (metadata) {
        audioRef.current.pause();
        audioRef.current.src = resolveLink(metadata.animation_url);
        audioRef.current.volume = volume;
        setCurrentSongMetadata(metadata);
      }
      audioRef.current.play();
      startTimer();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const toggle = (isPlayingState: boolean) => {
    const currentState =
      isPlayingState !== undefined ? isPlayingState : isPlaying;

    if (currentState) {
      pause();
    } else {
      play();
    }
  };

  const getCurrentIndex = (): number => {
    if (currentSongMetadata) {
      return tokens.findIndex(
        (metadata) =>
          metadata.animation_url === currentSongMetadata.animation_url
      );
    }
    return 0;
  };

  const toPrevTrack = (): void => {
    const i = getCurrentIndex();
    if (i > 0 && tokens.length > 1) {
      play(tokens[i - 1]);
    }
  };

  const toNextTrack = (): void => {
    const i = getCurrentIndex();
    if (i < tokens.length - 1 && tokens.length > 1) {
      play(tokens[i + 1]);
    }
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(Math.round(audioRef.current.currentTime));
      }
    }, 1000);
  };

  const onSearch = (value: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onSearchEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const onVolume = (vol: number) => {
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  return (
    <AudioContext.Provider
      value={{
        play,
        pause,
        toggle,
        toPrevTrack,
        toNextTrack,
        onSearch,
        onSearchEnd,
        onVolume,
        duration,
        trackProgress,
        isPlaying,
        currentSongMetadata,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
