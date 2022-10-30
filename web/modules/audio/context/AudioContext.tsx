import AudioTrackz from "modules/audio/models/AudioTrackz";
import { useWeb3 } from "modules/web3/context/Web3Context";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import useAudioTrackz from "../hooks/useAudioTrackz";
import useTrackzPlaylist from "../hooks/useTrackzPlaylist";

export interface AudioContextInterface {
  isPlaying: boolean;
  duration: number;
  trackProgress: number;
  currentTrackz: AudioTrackz | undefined;
  currentIndex: number;
  volume: number;
  canNext: boolean;
  canPrev: boolean;
  isMuted: boolean;
  playlist: AudioTrackz[];
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  play: (trackzOrPlaylistIndex?: number | AudioTrackz) => void;
  pause: () => void;
  onSearch: (seconds: number) => void;
  onSearchEnd: (seconds: number) => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
  addTrackz: (track: AudioTrackz) => void;
  removeAt: (index: number) => void;
  clearPlaylist: () => void;
  setPlaylist: (playlist: AudioTrackz[], startPlaying?: boolean) => void;
}

const AudioContext = createContext<AudioContextInterface | null>(null);

export function useAudio(): AudioContextInterface {
  if (!AudioContext) throw "AudioContext is undefined";
  return useContext(AudioContext)!;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // const { isMobile } = useDeviceDetection();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { audioTrackzs } = useWeb3();

  const {
    selectedTrackz,
    play: playTrack,
    pause,
    toNext,
    toPrev,
    canNext,
    canPrev,
    isPlaying,
    playlist,
    currentIndex,
    removeAt,
    clearPlaylist,
    setPlaylist: setTrackzPlaylist,
    addTrackz,
  } = useTrackzPlaylist(audioTrackzs);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const { duration } = useAudioTrackz(selectedTrackz);

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     // audioRef.current?.pause();
  //     // TODO: Remove Timer here
  //   };
  // });

  useEffect(() => {
    selectedTrackz?.volume(volume);
    setIsMuted(volume === 0);
  }, [volume, selectedTrackz, currentIndex]);

  useEffect(() => {
    selectedTrackz?.mute(isMuted);
  }, [isMuted, selectedTrackz, currentIndex]);

  useEffect(() => {
    setTrackProgress(Math.round(selectedTrackz?.progress || 0));
  }, [selectedTrackz, currentIndex]);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      stopTimer();
    }
    // Use callback to add starttimer to the dependencies or usememo ?
  }, [isPlaying, selectedTrackz]);

  const play = (track?: AudioTrackz | number) => {
    if (!track) return playTrack(track);

    if (track instanceof AudioTrackz) {
      const isInPlaylist = playlist.find((t) => t.id === track.id);
      // If not in the playlist then set a new playlist
      if (!isInPlaylist) {
        setTrackzPlaylist([track]);
      }
    }
    playTrack(track);
  };

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      const currentProgress = Math.round(selectedTrackz?.progress || 0);
      setTrackProgress(currentProgress);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const onSearch = (value: number) => {
    if (!selectedTrackz) return;

    const currentProgress = value || 0;
    stopTimer();
    setTrackProgress(currentProgress);

    // We want to be able to update the progress while not playing
    if (!isPlaying) {
      selectedTrackz.seek(currentProgress);
    }
  };

  const onSearchEnd = (value: number) => {
    if (!selectedTrackz) return;

    const currentProgress = value || 0;
    selectedTrackz.seek(currentProgress);
    setTrackProgress(currentProgress);

    if (!isPlaying) {
      playTrack();
    }
    startTimer();
  };

  const toggleMute = () => setIsMuted((muted) => !muted);

  const setPlaylistAndPlay = (
    playlist: AudioTrackz[],
    startPlaying = false
  ) => {
    setTrackzPlaylist(playlist);
    if (startPlaying) playTrack();
  };

  return (
    <AudioContext.Provider
      value={{
        removeAt,
        isPlaying,
        playlist,
        play,
        pause,
        toNextTrack: toNext,
        toPreviousTrack: toPrev,
        currentTrackz: selectedTrackz,
        currentIndex,
        duration,
        trackProgress,
        onSearch,
        onSearchEnd,
        volume,
        setVolume,
        canNext,
        canPrev,
        isMuted,
        toggleMute,
        addTrackz,
        clearPlaylist,
        setPlaylist: setPlaylistAndPlay,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
