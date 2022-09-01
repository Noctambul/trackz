import { useEffect, useMemo, useState } from "react";

/**
 * A hook that handle a playlist
 * @returns
 */
export default function usePlaylist<T>(
  initialPlaylist: T[] = [],
  loopMode = false
) {
  const [playlist, setPlaylist] = useState<T[]>(initialPlaylist);
  const [index, setIndex] = useState(0);
  const [isLoopMode, setIsLoopMode] = useState(loopMode);
  const selected = useMemo(() => {
    return playlist[index];
  }, [index, playlist]);

  useEffect(() => {
    setPlaylist(initialPlaylist);
  }, [initialPlaylist]);

  const canNext = isLoopMode || index !== playlist.length - 1;
  const canPrev = isLoopMode || index !== 0;

  const next = () => {
    if (canNext) setIndex((i) => (++i).modulo(playlist.length));
  };

  const previous = () => {
    if (canPrev) setIndex((i) => (--i).modulo(playlist.length));
  };

  const select = (index: number) => setIndex(index);

  return {
    setPlaylist,
    playlist,
    index,
    next,
    previous,
    selected,
    select,
    setIsLoopMode,
    canNext,
    canPrev,
  };
}
