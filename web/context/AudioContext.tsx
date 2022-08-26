import trackzs from "data/trackzs";
import useTrackzPlaylist from "hooks/useTrackzPlaylist";
import TrackzMetadata from "models/TrackzMetadata";
import { createContext, useContext, useEffect, useRef, useState } from "react";

export interface AudioContextInterface {
  isPlaying: boolean;
  duration: number;
  trackProgress: number;
  currentTrackz: TrackzMetadata | undefined;
  volume: number;
  setVolume: (volume: number) => void;
  play: (trackz?: TrackzMetadata) => void;
  pause: () => void;
  onSearch: (seconds: number) => void;
  onSearchEnd: () => void;
  toPreviousTrack: () => void;
  toNextTrack: () => void;
}

const AudioContext = createContext<AudioContextInterface | undefined>(
  undefined
);

export function useAudio(): AudioContextInterface {
  if (!AudioContext) throw "AudioContext is undefined";
  return useContext(AudioContext)!;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const {
    selectedTrackz,
    setSelectedTrackz: selectTrackz,
    next,
    previous,
  } = useTrackzPlaylist(trackzs);
  const [isPlaying, setIsplaying] = useState(false);
  const [duration, setDuration] = useState(456);
  const [trackProgress, setTrackProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     // audioRef.current?.pause();
  //     // TODO: Remove Timer here
  //   };
  // });

  useEffect(() => {
    selectedTrackz.volume(volume);
  }, [volume, selectedTrackz]);

  useEffect(() => {
    if (selectedTrackz) {
      setDuration(selectedTrackz.duration);
      setTrackProgress(Math.round(selectedTrackz.progress));
      console.log("Selected Trackz ", selectedTrackz.metadata.title);
    }
  }, [selectedTrackz]);

  useEffect(() => {
    if (isPlaying) {
      selectedTrackz.play();
      startTimer();
    } else {
      selectedTrackz.pause();
    }
    // Use callback to add starttimer to the dependencies
  }, [isPlaying, selectedTrackz]);

  const play = (track?: TrackzMetadata) => {
    if (track && track.id != selectedTrackz.id) {
      selectTrackz(track.id);
    }
    setIsplaying(true);
  };

  const pause = () => {
    setIsplaying(false);
    stopTimer();
  };

  const toNextTrack = () => {
    selectedTrackz.stop();
    next();
    setIsplaying(true);
  };

  const toPreviousTrack = () => {
    selectedTrackz.stop();
    previous();
    setIsplaying(true);
  };

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      // TODO: Use howler.on("end", ..)
      // https://stackoverflow.com/questions/41003367/correct-way-to-call-howler-onend-method

      // if (audioRef.current.ended) {
      //   toNextTrack();
      // } else

      setTrackProgress(Math.round(selectedTrackz.progress));
    }, 500);
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const onSearch = (value: number) => {
    stopTimer();
    selectedTrackz.seek(value);
    setTrackProgress(selectedTrackz.progress || 0);
  };

  const onSearchEnd = () => {
    if (!isPlaying) {
      setIsplaying(true);
    }
    startTimer();
  };

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        play,
        pause,
        toNextTrack,
        toPreviousTrack,
        currentTrackz: selectedTrackz.metadata,
        duration,
        trackProgress,
        onSearch,
        onSearchEnd,
        volume,
        setVolume,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}
