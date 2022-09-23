import { IconButton, useDisclosure } from "@chakra-ui/react";
import AudioTrackz from "models/AudioTrackz";
import Image from "next/image";
import { useMemo } from "react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import { RiPlayListAddFill } from "react-icons/ri";

type Props = {
  playlist: AudioTrackz[];
  currentTrackIndex?: number;
  play: (track: AudioTrackz) => void;
  isPlaying?: boolean;
};

export default function Playlist({
  playlist,
  play,
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
        } z-[-1] w-screen overflow-y-scroll rounded bg-white py-2 text-text shadow-player transition-all duration-500 scrollbar-hide sm:w-[400px]`}
      >
        <div className="flex w-full flex-col justify-center text-sm">
          {[...playlist].splice(currentTrackIndex).map((track) => {
            const isSelected = track.id === currentTrack.id;
            return (
              <div
                key={track.id}
                className={`group flex h-14 w-full cursor-pointer items-center gap-4 ${
                  isSelected ? "bg-lightgray" : "hover:bg-bgc"
                } p-4  focus:bg-bgc`}
                aria-label={`Play ${track.name}`}
                onClick={() => play(track)}
                role="button"
              >
                <div className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center border border-lightgray">
                  <Image
                    src={track.coverUri}
                    objectFit="cover"
                    layout="fill"
                    alt={track.name}
                  />
                  <div
                    className={`duration-400 relative ${
                      isSelected || "hidden"
                    } rounded-full bg-bgc transition-all group-hover:block `}
                  >
                    {isPlaying && isSelected ? (
                      <AiFillPauseCircle className="relative stroke-text text-3xl" />
                    ) : (
                      <AiFillPlayCircle className="relative stroke-text text-3xl" />
                    )}
                  </div>
                </div>
                <div className="flex grow flex-col truncate">
                  <p className="truncate">{track.name}</p>
                  <p className="truncate text-xs text-subtext">
                    {track.creator}
                  </p>
                </div>
                <div className="shrink-0 text-xs text-subtext">
                  {track.formattedDuration}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
