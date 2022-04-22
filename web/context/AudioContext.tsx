import { useIpfs } from "hooks/useIpfs";
import { createContext, useRef, useState } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  currentSongUri: string;
  play: (uri: string) => void;
  pause: () => void;
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
  const [currentSongUri, setCurrentSongUri] = useState<string>("");

  const play = (uri: string) => {
    console.log("Play");
    if (audioRef.current) {
      console.log(audioRef.current.id);
      audioRef.current.pause();
      audioRef.current.src = resolveLink(uri);
      audioRef.current.play();
      setCurrentSongUri(uri);
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

  // const toggle = () => {
  //   if (isPlaying) {
  //     pause();
  //   } else {
  //     play();
  //   }
  // };

  return (
    <AudioContext.Provider value={{ play, pause, isPlaying, currentSongUri }}>
      {children}
    </AudioContext.Provider>
  );
};
