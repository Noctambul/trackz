import AudioTrackz from "models/audio-trackz";
import { useEffect } from "react";
import usePlaylist from "./usePlaylist";

/**
 * Number of Trackz that will be preloaded.
 *
 */
const PRELOAD_BUFFER = 3;

export default function useTrackzPlaylist(trackzs: AudioTrackz[]) {
  const { selected, playlist, index } = usePlaylist<AudioTrackz>(trackzs);

  useEffect(() => {
    // Initial preloading
    preload();
  });

  /**
   * Will start preloading the current trackz and the nexts for the desired buffer size
   */
  const preload = () => {
    for (let i = index; i < PRELOAD_BUFFER; i++) {
      if (playlist[i].state !== "unloaded") {
        playlist[i].load();
      }
    }
  };

  return { selectedTrackz: selected };
}
