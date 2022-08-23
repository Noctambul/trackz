import Trackz from "models/trackz";
import { useState } from "react";
import useMath from "./useMath";

/**
 * A hook that handle a playlist
 * @returns
 */
export default function usePlaylist<T>(initialPlaylist: T[] = []) {
  const { modulo } = useMath();
  const [playlist, setPlaylist] = useState<T[]>(initialPlaylist);
  const [index, setIndex] = useState(0);

  const nextIndex = () => setIndex((i) => modulo(++i, playlist.length));
  const prevIndex = () =>
    setIndex((i) => {
      const val = modulo(--i, playlist.length);
      // debugger;
      return val;
    });

  const next = (): Trackz | null => {
    if (playlist.length == 0) return null;

    return null;
  };

  return { index, nextIndex, prevIndex };
}
