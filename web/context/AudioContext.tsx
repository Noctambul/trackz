import { useIpfs } from "hooks/useIpfs";
import { createContext, useRef, useState } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  currentSongUri: string;
  play: (uri: string) => void;
}

export const AudioContext = createContext<AudioContextInterface | null>(null);

let counter = 1;

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolveLink } = useIpfs();
  const audioRef = useRef<HTMLAudioElement>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongUri, setCurrentSongUri] = useState<string>("");

  if (typeof Audio !== "undefined") {
    audioRef.current = new Audio();
    audioRef.current.id = "" + counter++;
    console.log("CREATED audio: ", audioRef.current.id);
  }

  const play = (uri: string) => {
    if (audioRef.current) {
      console.log(audioRef.current.id);
      audioRef.current.pause();
      audioRef.current.src = resolveLink(uri);
      audioRef.current.play();
      setCurrentSongUri(uri);
      setIsPlaying(true);

      console.log("ID :", audioRef.current.id);
    }
  };

  // const pause = () => {
  //   if (isPlaying) {
  //     audioRef.current?.pause();
  //     setIsPlaying(false);
  //   }
  // };

  // const toggle = () => {
  //   if (isPlaying) {
  //     pause();
  //   } else {
  //     play();
  //   }
  // };

  return (
    <AudioContext.Provider value={{ play, isPlaying, currentSongUri }}>
      {children}
    </AudioContext.Provider>
  );
};
