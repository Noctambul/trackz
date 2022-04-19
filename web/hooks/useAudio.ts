/* eslint-disable react-hooks/exhaustive-deps */
import { TokenMetadata } from "pages";
import { useRef, useState } from "react";
import { useIpfs } from "./useIpfs";

const useAudio = (tokenMetadata: TokenMetadata) => {
  const { resolveLink } = useIpfs();
  const [audio, setAudio] = useState(url);
  const [trackIndex, setTrackIndex] = useState(0);
  const [newSong, setNewSong] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  // resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url
  const audioRef = useRef(new Audio());

  const intervalRef = useRef<any>();
  const isReady = useRef(false);

  return {};
};

export default useAudio;
