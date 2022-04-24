import { useIpfs } from "hooks/useIpfs";
import { TokenMetadata } from "pages";
import React, { createContext, useRef, useState } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  currentSongMetadata?: TokenMetadata;
  play: (metadata?: TokenMetadata) => void;
  pause: () => void;
  toggle: () => void;
}

export const AudioContext = createContext<AudioContextInterface | null>(null);

let audio: HTMLAudioElement;

if (typeof Audio !== "undefined") {
  audio = new Audio();
}

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolveLink } = useIpfs();
  const audioRef = useRef<HTMLAudioElement>(audio);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongMetadata, setCurrentSongMetadata] =
    useState<TokenMetadata>();
  // const [currentSongUri, setCurrentSongUri] = useState<string>("");

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

  return (
    <AudioContext.Provider
      value={{ play, pause, toggle, isPlaying, currentSongMetadata }}
    >
      {children}
    </AudioContext.Provider>
  );
};
