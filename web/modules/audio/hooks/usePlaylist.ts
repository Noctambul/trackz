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
  add: (item: T) => void;
  index: number;
  next: () => void;
  previous: () => void;
  selected: T;
  select: (index: number) => void;
  removeAt: (index: number) => void;
  clear: () => void;
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
  const [canNext, setCanNext] = useState(false);
  const [canPrev, setCanPrev] = useState(false);
  const [index, setIndex] = useState(0);
  const [isLoopMode, setIsLoopMode] = useState(loopMode);
  const selected = useMemo(() => {
    return playlist[index];
  }, [index, playlist]);

  useEffect(() => {
    if (playlist.length === 0) {
      setPlaylist(initialPlaylist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPlaylist]);

  useEffect(() => {
    setCanNext(isLoopMode || index !== playlist.length - 1);
    setCanPrev(isLoopMode || index !== 0);
  }, [isLoopMode, index, playlist]);

  const next = () => {
    if (canNext) setIndex((i) => (++i).modulo(playlist.length));
  };

  const previous = () => {
    if (canPrev) setIndex((i) => (--i).modulo(playlist.length));
  };

  const select = (index: number) => {
    if (index >= 0 && index < playlist.length) setIndex(index);
  };

  const removeAt = (removeIndex: number) => {
    if (removeIndex < 0 || removeIndex >= playlist.length) return;

    const cloned = [...playlist];
    cloned.splice(removeIndex, 1);
    setPlaylist(cloned);

    // If the index is before the current selected index then we have to modify it accordingly
    if (removeIndex < index) {
      setIndex(index - 1);
    }
  };

  const add = (item: T) => {
    setPlaylist([...playlist, item]);
  };

  const clear = () => setPlaylist([selected]);

  return {
    playlist,
    index,
    next,
    previous,
    selected,
    select,
    setIsLoopMode,
    canNext,
    canPrev,
    add,
    removeAt,
    setPlaylist,
    clear,
  };
}
