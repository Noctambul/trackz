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
  const { selected, playlist, index } = usePlaylist<AudioTrackz>(audioTrackzs);

  useEffect(() => {
    // Initial preloading
    console.log(
      `Preloading ${preloadBuffer} Trackz from ${index} to ${
        index + preloadBuffer
      }`
    );
    preload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  /**
   * Will start preloading the current trackz and the nexts for the desired buffer size
   */
  const preload = () => {
    for (let i = index; i < preloadBuffer; i++) {
      if (playlist[i].state !== "unloaded") {
        playlist[i].load();
      }
    }
  };

  return { selectedTrackz: selected };
}
