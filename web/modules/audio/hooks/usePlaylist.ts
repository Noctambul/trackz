import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

interface Playlist<T> {
  index: number;
  list: T[];
}

type PlaylistInterface<T> = {
  setPlaylist: (list: T[]) => void;
  playlist: T[];
  add: (item: T) => void;
  index: number;
  next: () => void;
  previous: () => void;
  selected: T | undefined;
  select: (index: number) => void;
  removeAt: (index: number) => void;
  clear: () => void;
  setIsLoopMode: Dispatch<SetStateAction<boolean>>;
  canNext: boolean;
  canPrev: boolean;
};

export default function usePlaylist<T>(
  initialPlaylist: T[] = [],
  loopMode = false
): PlaylistInterface<T> {
  const [isLoopMode, setIsLoopMode] = useState(loopMode);
  const [_playlist, _setPlaylist] = useState<Playlist<T>>({
    index: 0,
    list: initialPlaylist,
  });

  const index = _playlist.index;
  const playlist = _playlist.list;
  const selected = playlist[index];

  const canNext = useMemo(
    () => isLoopMode || index !== playlist.length - 1,
    [index, isLoopMode, playlist.length]
  );

  const canPrev = useMemo(() => isLoopMode || index !== 0, [index, isLoopMode]);

  // TODO: Hack
  useEffect(() => {
    if (playlist.length === 0 && initialPlaylist.length > 0) {
      _setPlaylist({ index: 0, list: initialPlaylist });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPlaylist]);

  const setIndex = (i: number) => {
    if (i < 0 || i >= playlist.length) return;
    _setPlaylist({ index: i, list: playlist });
  };

  const setPlaylist = (list: T[] = []) => {
    const index = Math.max(
      0,
      list.findIndex((o) => o === selected)
    );
    _setPlaylist({ index, list });
  };

  const next = () => {
    if (canNext) setIndex((index + 1).modulo(playlist.length));
  };

  const previous = () => {
    if (canPrev) setIndex((index - 1).modulo(playlist.length));
  };

  const select = (index: number) => {
    if (index >= 0 && index < playlist.length) setIndex(index);
  };

  const removeAt = (removeIndex: number) => {
    if (removeIndex < 0 || removeIndex >= playlist.length) return;

    const list = [...playlist];
    list.splice(removeIndex, 1);
    _setPlaylist({
      // If the index is before the current selected index then we have to modify it accordingly
      index: removeIndex < index ? index - 1 : index,
      list,
    });
  };

  const add = (item: T) => {
    _setPlaylist({ index, list: [...playlist, item] });
  };

  const clear = () => setPlaylist(selected ? [selected] : []);

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
