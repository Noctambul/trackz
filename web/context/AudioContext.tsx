import { createContext } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
  previous: () => void;
  next: () => void;
}

export const AudioContext = createContext<AudioContextInterface | null>(null);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const isPlaying = false;

  const play = () => console.log("Play");
  const pause = () => console.log("Pause");
  const previous = () => console.log("Previous");
  const next = () => console.log("Next");

  return (
    <AudioContext.Provider value={{ isPlaying, play, pause, next, previous }}>
      {children}
    </AudioContext.Provider>
  );
};
