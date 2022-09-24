import { IconButton } from "@chakra-ui/react";
import AudioTrackz from "models/AudioTrackz";
import Image from "next/image";
import {
  AiFillPauseCircle,
  AiFillPlayCircle,
  AiOutlineCloseSquare,
} from "react-icons/ai";

type Props = {
  isSelected?: boolean;
  isPlaying?: boolean;
  track: AudioTrackz;
  play: (track: AudioTrackz) => void;
  remove: (track: AudioTrackz) => void;
};

export default function PlaylistTrack({
  isSelected = false,
  isPlaying = false,
  track,
  play,
  remove,
  key,
}: Props): JSX.Element {
  return (
    <div
      className={`group flex h-14 w-full cursor-pointer items-center gap-4 ${
        isSelected ? "bg-lightgray" : "hover:bg-bgc"
      } p-4  focus:bg-bgc`}
      aria-label={`Play ${track.name}`}
      onClick={() => {
        console.log("Play ", track.id);
        play(track);
      }}
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
        <p className="truncate text-xs text-subtext">{track.creator}</p>
      </div>
      <div className="shrink-0 text-xs text-subtext">
        {track.formattedDuration}
      </div>
      <IconButton
        aria-label={`Remove ${track.name} from the playlist`}
        size="sm"
        variant="outline"
        onClick={(e) => {
          console.log("Remove ", track.id);
          e.preventDefault();
          e.stopPropagation();
          remove(track);
        }}
        icon={<AiOutlineCloseSquare />}
      />
    </div>
  );
}
