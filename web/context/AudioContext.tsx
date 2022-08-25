import trackzs from "data/trackzs";
import { useIpfs } from "hooks/useIpfs";
import useTrackzPlaylist from "hooks/useTrackzPlaylist";
import TrackzMetadata from "models/trackz-metadata";
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

let audio: HTMLAudioElement;
if (typeof Audio !== "undefined") {
  audio = new Audio();
}

const AudioContext = createContext<AudioContextInterface | undefined>(
  undefined
);

export function useAudio(): AudioContextInterface {
  if (!AudioContext) throw "AudioContext is undefined";
  return useContext(AudioContext)!;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const { resolveLink } = useIpfs();
  // const howlerRef = useRef<Howl>();
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const { selectedTrackz, playTrack } = useTrackzPlaylist(trackzs);
  const [isPlaying, setIsplaying] = useState(false);
  const [duration, setDuration] = useState(220);
  const [trackProgress, setTrackProgress] = useState(0);
  // const [currentTrackz, setCurrentTrackz] = useState<TrackzMetadata>();
  const [volume, setVolume] = useState(1);

  // useEffect(() => {
  //   return () => {
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     // audioRef.current?.pause();
  //     // TODO: Remove Timer here
  //   };
  // });

  useEffect(() => {
    // howlerRef.current?.volume(volume);
    selectedTrackz.volume(volume);
  }, [volume]);

  useEffect(() => {
    if (selectedTrackz) {
      // howlerRef.current?.stop();
      // howlerRef.current = new Howl({
      //   src: [resolveLink(currentTrackz.musicUri)],
      //   html5: true,
      //   preload: "metadata", // or true to also preload the file
      //   volume,
      // });

      setDuration(selectedTrackz.duration);
      setTrackProgress(Math.round(selectedTrackz.progress));
      setIsplaying(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrackz]);

  useEffect(() => {
    if (isPlaying) {
      // if (!howlerRef.current?.playing()) {
      //   howlerRef.current?.play();
      //   startTimer();
      // }
      selectedTrackz.play();
      startTimer();
    } else {
      selectedTrackz.pause();
    }
    // Use callback to add starttimer to the dependencies
  }, [isPlaying]);

  const play = (track?: TrackzMetadata) => {
    if (track && track.id != selectedTrackz.id) {
      setIsplaying(false);
      playTrack(track.id);
      // setCurrentTrackz(trackz);
    } else {
      setIsplaying(true);
    }
  };

  const pause = () => {
    setIsplaying(false);
    stopTimer();
  };

  const toPreviousTrack = () => console.log("Previous");
  const toNextTrack = () => console.log("Next");

  const startTimer = () => {
    stopTimer();
    intervalRef.current = setInterval(() => {
      // TODO: Use howler.on("end", ..)
      // https://stackoverflow.com/questions/41003367/correct-way-to-call-howler-onend-method

      // if (audioRef.current.ended) {
      //   toNextTrack();
      // } else

      // if (howlerRef.current) {
      setTrackProgress(Math.round(selectedTrackz.progress));
      // }
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
