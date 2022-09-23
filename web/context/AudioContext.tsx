import useAudioTrackz from "hooks/useAudioTrackz";
import useTrackzPlaylist from "hooks/useTrackzPlaylist";
import AudioTrackz from "models/AudioTrackz";
import TrackzMetadata from "models/TrackzMetadata";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useWeb3 } from "./Web3Context";

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
  play: (trackz?: TrackzMetadata | AudioTrackz) => void;
  pause: () => void;
  onSearch: (seconds: number) => void;
  onSearchEnd: (seconds: number) => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
}

const AudioContext = createContext<AudioContextInterface | null>(null);

export function useAudio(): AudioContextInterface {
  if (!AudioContext) throw "AudioContext is undefined";
  return useContext(AudioContext)!;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // const { isMobile } = useDeviceDetection();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { trackzMetadata } = useWeb3();

  const {
    selectedTrackz,
    setSelectedTrackz,
    next,
    previous,
    canNext,
    canPrev,
    playlist,
    currentIndex,
  } = useTrackzPlaylist(trackzMetadata);
  const [isPlaying, setIsplaying] = useState(false);
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
  }, [volume, selectedTrackz]);

  useEffect(() => {
    selectedTrackz?.mute(isMuted);
  }, [isMuted, selectedTrackz]);

  useEffect(() => {
    setTrackProgress(Math.round(selectedTrackz?.progress || 0));
  }, [selectedTrackz]);

  useEffect(() => {
    if (isPlaying) {
      selectedTrackz?.play();
      startTimer();
    } else {
      stopTimer();
      selectedTrackz?.pause();
    }
    // Use callback to add starttimer to the dependencies or usememo ?
  }, [isPlaying, selectedTrackz]);

  const play = (track?: TrackzMetadata | AudioTrackz) => {
    const metadata = track instanceof AudioTrackz ? track.metadata : track;
    if (metadata && selectedTrackz && metadata.id != selectedTrackz?.id) {
      selectedTrackz.stop();
      setSelectedTrackz(metadata.id);
    }
    setIsplaying(true);
  };

  const pause = () => {
    setIsplaying(false);
    stopTimer();
  };

  const toNextTrack = () => {
    selectedTrackz?.stop();
    next();
    setIsplaying(true);
  };

  const toPreviousTrack = () => {
    selectedTrackz?.stop();
    previous();
    setIsplaying(true);
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
      setIsplaying(true);
    }
    startTimer();
  };

  const toggleMute = () => setIsMuted((muted) => !muted);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        playlist,
        play,
        pause,
        toNextTrack,
        toPreviousTrack,
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
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
