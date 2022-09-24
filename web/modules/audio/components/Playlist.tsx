import { IconButton, useDisclosure } from "@chakra-ui/react";
import AudioTrackz from "models/AudioTrackz";
import { useMemo } from "react";
import { RiPlayListAddFill } from "react-icons/ri";
import PlaylistTrack from "./PlaylistTrack";

type Props = {
  playlist: AudioTrackz[];
  removeTrack: (track: AudioTrackz) => void;
  currentTrackIndex?: number;
  play: (track: AudioTrackz) => void;
  isPlaying?: boolean;
};

export default function Playlist({
  playlist,
  play,
  removeTrack,
  isPlaying = false,
  currentTrackIndex = 0,
}: Props): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();
  const currentTrack = useMemo(
    () => playlist[currentTrackIndex],
    [playlist, currentTrackIndex]
  );

  return (
    <>
      <IconButton
        onClick={onToggle}
        variant="audioplayer"
        aria-label="Playlist"
        icon={<RiPlayListAddFill size={22} />}
      />

      <div
        className={`fixed right-0 bottom-14 ${
          isOpen ? "top-0 sm:top-44" : "top-[100vh]"
        } scrollba<r-hide z-[-1] w-screen overflow-y-scroll rounded bg-white py-2 text-text shadow-player transition-all duration-500 sm:w-[400px]`}
      >
        <div className="flex w-full flex-col justify-center text-sm">
          {playlist.map((track) => {
            const isSelected = track.id === currentTrack.id;
            return (
              <PlaylistTrack
                key={track.id}
                isSelected={isSelected}
                isPlaying={isPlaying}
                play={play}
                remove={removeTrack}
                track={track}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
