import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type PlaylistInterface<T> = {
  setPlaylist: Dispatch<SetStateAction<T[]>>;
  playlist: T[];
  index: number;
  next: () => void;
  previous: () => void;
  selected: T;
  select: (index: number) => void;
  setIsLoopMode: Dispatch<SetStateAction<boolean>>;
  canNext: boolean;
  canPrev: boolean;
};

/**
 * A hook that handle a playlist
 * @returns
 */
export default function usePlaylist<T>(
  initialPlaylist: T[] = [],
  loopMode = false
): PlaylistInterface<T> {
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
