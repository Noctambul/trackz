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
  play: (metadata?: TokenMetadata) => void;
  pause: () => void;
  toggle: () => void;
  toPrevTrack: () => void;
  toNextTrack: () => void;
}

export const AudioContext = createContext<AudioContextInterface | null>(null);

let audio: HTMLAudioElement;

if (typeof Audio !== "undefined") {
  audio = new Audio();
}

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolveLink } = useIpfs();
  const audioRef = useRef<HTMLAudioElement>(audio);
  const { tokens } = useContext(Web3Context) as Web3ContextInterface;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongMetadata, setCurrentSongMetadata] =
    useState<TokenMetadata>();

  useEffect(() => {
    if (tokens.length > 0) {
      setCurrentSongMetadata(tokens[0]);
    }
  }, [tokens]);

  const play = (metadata?: TokenMetadata) => {
    console.log("Play");
    if (audioRef.current) {
      if (metadata) {
        audioRef.current.pause();
        audioRef.current.src = resolveLink(metadata.animation_url);
        setCurrentSongMetadata(metadata);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    console.log("Pause");
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const toggle = () => {
    if (isPlaying) {
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

  return (
    <AudioContext.Provider
      value={{
        play,
        pause,
        toggle,
        toPrevTrack,
        toNextTrack,
        isPlaying,
        currentSongMetadata,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
