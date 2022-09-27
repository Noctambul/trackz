import AudioTrackz from "modules/audio/models/AudioTrackz";
import { useEffect } from "react";
import usePlaylist from "./usePlaylist";

/**
 * Number of Trackz that will be preloaded.
 *
 */
const DEFAULT_PRELOAD_BUFFER = 3;

type TrackzPlaylistInterface = {
  selectedTrackz: AudioTrackz | undefined;
  next: () => void;
  previous: () => void;
  playlist: AudioTrackz[];
  setSelectedTrackz: (id: number) => void;
  removeTrackz: (track: AudioTrackz) => void;
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
    removeIndex,
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

  const removeTrackz = (track: AudioTrackz) => {
    // Stop the track if it is the one that is playing
    if (track.isPlaying) {
      track.stop();
    }
    removeIndex(playlist.findIndex((t) => t.id === track.id));
  };

  return {
    selectedTrackz: selected,
    removeTrackz,
    next,
    previous,
    playlist,
    setSelectedTrackz,
    canNext,
    canPrev,
    currentIndex: index,
  };
}
