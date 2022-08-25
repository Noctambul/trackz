import AudioTrackz from "models/audio-trackz";
import TrackzMetadata from "models/trackz-metadata";
import { useEffect, useMemo } from "react";
import usePlaylist from "./usePlaylist";

/**
 * Number of Trackz that will be preloaded.
 *
 */
const DEFAULT_PRELOAD_BUFFER = 3;

export default function useTrackzPlaylist(
  trackzs: (AudioTrackz | TrackzMetadata)[],
  preloadBuffer = DEFAULT_PRELOAD_BUFFER
) {
  const audioTrackzs: AudioTrackz[] = useMemo(
    () =>
      trackzs.map((track) =>
        track instanceof AudioTrackz ? track : new AudioTrackz(track)
      ),
    [trackzs]
  );
  const { selected, playlist, index, next, previous, select } =
    usePlaylist<AudioTrackz>(audioTrackzs);

  useEffect(() => {
    /**
     * Will start preloading the current trackz and the nexts for the desired buffer size
     */
    const preload = () => {
      for (let count = index; count < preloadBuffer + index; count++) {
        const i = count % playlist.length;
        if (playlist[i].state === "unloaded") {
          playlist[i].load();
        }
      }
    };
    preload();
  }, [index, playlist, preloadBuffer]);

  const playTrack = (trackId: number) => {
    const selectedIndex = playlist.findIndex((track) => track.id === trackId);
    select(selectedIndex);
  };

  return { selectedTrackz: selected, next, previous, playlist, playTrack };
}
