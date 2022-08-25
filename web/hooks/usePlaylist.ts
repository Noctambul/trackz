import { useMemo, useState } from "react";
import useMath from "./useMath";

/**
 * A hook that handle a playlist
 * @returns
 */
export default function usePlaylist<T>(initialPlaylist: T[] = []) {
  const { modulo } = useMath();
  const [playlist, setPlaylist] = useState<T[]>(initialPlaylist);
  const [index, setIndex] = useState(0);
  const selected = useMemo(() => playlist[index], [index, playlist]);

  const next = () => setIndex((i) => modulo(++i, playlist.length));
  const previous = () => setIndex((i) => modulo(--i, playlist.length));
  const select = (index: number) => setIndex(index);

  return { playlist, index, next, previous, selected, select };
}
