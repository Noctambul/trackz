import { createContext } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  play: () => void;
  pause: () => void;
  previous: () => void;
  next: () => void;
}

export const AudioContext = createContext<AudioContextInterface | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const isPlaying = false;
  const duration = 220;
  const currentTime = 122;

  const play = () => console.log("Play");
  const pause = () => console.log("Pause");
  const previous = () => console.log("Previous");
  const next = () => console.log("Next");

  return (
    <AudioContext.Provider
      value={{ isPlaying, play, pause, next, previous, duration, currentTime }}
    >
      {children}
    </AudioContext.Provider>
  );
};
