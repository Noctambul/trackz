import AudioTrackz from "modules/audio/models/AudioTrackz";
import { useEffect, useState } from "react";
import usePlaylist from "./usePlaylist";

/**
 * Number of Trackz that will be preloaded.
 *
 */
const DEFAULT_PRELOAD_BUFFER = 3;

type TrackzPlaylistInterface = {
  selectedTrackz: AudioTrackz | undefined;
  playlist: AudioTrackz[];
  currentIndex: number;
  isPlaying: boolean;
  canNext: boolean;
  canPrev: boolean;
  addTrackz: (track: AudioTrackz) => void;
  setPlaylist: (list: AudioTrackz[]) => void;
  removeAt: (index: number) => void;
  clearPlaylist: () => void;
  toNext: () => void;
  toPrev: () => void;
  play: (indexOrTrackz?: AudioTrackz | number | undefined) => void;
  pause: () => void;
};

export default function useTrackzPlaylist(
  trackzs: AudioTrackz[],
  preloadBuffer = DEFAULT_PRELOAD_BUFFER
): TrackzPlaylistInterface {
  const [isPlaying, setIsPlaying] = useState(false);
  const {
    selected: selectedTrackz,
    playlist,
    index,
    next,
    previous,
    select,
    canNext,
    canPrev,
    removeAt: remove,
    clear,
    add,
    setPlaylist,
  } = usePlaylist<AudioTrackz>(trackzs, false);

  useEffect(() => {
    if (!selectedTrackz) return;

    const track = selectedTrackz;
    track.onended(next);
    return () => track.offended(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrackz]);

  useEffect(() => {
    /**
     * Will start preloading the current trackz and the nexts for the desired buffer size
     */
    const preload = () => {
      if (playlist.length === 0) return;

      for (let count = index; count < preloadBuffer + index; count++) {
        const i = count % playlist.length;
        const track = playlist[i];
        if (track?.state === "unloaded") {
          track.load();
        }
      }
    };

    preload();
  }, [index, playlist, preloadBuffer]);

  useEffect(() => {
    if (isPlaying) {
      selectedTrackz?.play();
    } else {
      selectedTrackz?.pause();
    }
  }, [isPlaying, selectedTrackz, index]);

  const toNext = () => {
    selectedTrackz?.stop();
    next();
    setIsPlaying(true);
  };

  const toPrev = () => {
    selectedTrackz?.stop();
    previous();
    setIsPlaying(true);
  };

  const play = (indexOrTrack?: AudioTrackz | number | undefined): void => {
    let playIndex: number | undefined =
      indexOrTrack instanceof AudioTrackz
        ? playlist.findIndex((track) => track.id === indexOrTrack.id)
        : indexOrTrack;

    if (playIndex === undefined) playIndex = index;

    selectedTrackz?.stop();
    select(playIndex);
    setIsPlaying(true);
  };

  const pause = () => setIsPlaying(false);

  const removeAt = (removeIndex: number) => {
    // Stop the track if it is the one that is playing
    if (playlist[removeIndex].isPlaying) {
      playlist[removeIndex].stop();
    }
    remove(removeIndex);
  };

  return {
    play,
    pause,
    clearPlaylist: clear,
    selectedTrackz,
    addTrackz: add,
    removeAt,
    toNext,
    toPrev,
    playlist,
    canNext,
    canPrev,
    currentIndex: index,
    setPlaylist,
    isPlaying,
  };
}
