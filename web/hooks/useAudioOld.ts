/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState } from "react";
import { useIpfs } from "./useIpfs";

const useAudio = (soundUri: string) => {
  const { resolveLink } = useIpfs();
  const [isPlaying, setIsPlaying] = useState(false);
  // resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url
  const audioRef = useRef<HTMLAudioElement>();

  if (typeof Audio !== "undefined") {
    audioRef.current = new Audio(resolveLink(soundUri));
  }

  const play = () => {
    if (!isPlaying) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  const pause = () => {
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

  return { toggle, isPlaying };
};

export default useAudio;
