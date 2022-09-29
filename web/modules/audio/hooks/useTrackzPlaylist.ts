import AudioTrackz from "modules/audio/models/AudioTrackz";
import { Dispatch, SetStateAction, useEffect } from "react";
import usePlaylist from "./usePlaylist";

/**
 * Number of Trackz that will be preloaded.
 *
 */
const DEFAULT_PRELOAD_BUFFER = 3;

type TrackzPlaylistInterface = {
  setPlaylist: Dispatch<SetStateAction<AudioTrackz[]>>;
  selectedTrackz: AudioTrackz | undefined;
  next: () => void;
  previous: () => void;
  playlist: AudioTrackz[];
  addTrackz: (track: AudioTrackz) => void;
  setSelectedTrackz: (id: number) => void;
  removeAt: (index: number) => void;
  canNext: boolean;
  canPrev: boolean;
  currentIndex: number;
};

export default function useTrackzPlaylist(
  trackzs: AudioTrackz[],
  preloadBuffer = DEFAULT_PRELOAD_BUFFER
): TrackzPlaylistInterface {
  const {
    selected,
    playlist,
    index,
    next,
    previous,
    select,
    canNext,
    canPrev,
    removeAt: remove,
    add,
    setPlaylist,
  } = usePlaylist<AudioTrackz>(trackzs, false);

  useEffect(() => {
    if (!selected) return;

    const track = selected;
    track.onended(next);
    return () => track.offended(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    /**
     * Will start preloading the current trackz and the nexts for the desired buffer size
     */
    const preload = () => {
      if (playlist.length === 0) return;

      for (let count = index; count < preloadBuffer + index; count++) {
        const i = count % playlist.length;
        const track = playlist[i];
        if (track.state === "unloaded") {
          track.load();
        }
      }
    };

    preload();
  }, [index, playlist, preloadBuffer]);

  const setSelectedTrackz = (trackId: number) =>
    select(playlist.findIndex((track) => track.id === trackId));

  const removeAt = (removeIndex: number) => {
    const track = playlist[removeIndex];

    // Stop the track if it is the one that is playing
    if (track.isPlaying) {
      track.stop();
    }

    remove(removeIndex);
  };

  return {
    selectedTrackz: selected,
    addTrackz: add,
    removeAt,
    next,
    previous,
    playlist,
    setSelectedTrackz,
    canNext,
    canPrev,
    currentIndex: index,
    setPlaylist,
  };
}
