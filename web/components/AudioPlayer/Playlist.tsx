import { IconButton, useDisclosure } from "@chakra-ui/react";
import AudioTrackz from "models/AudioTrackz";
import Image from "next/image";
import { RiPlayListAddFill } from "react-icons/ri";

type Props = {
  playlist: AudioTrackz[];
  currentTrackIndex?: number;
};

export default function Playlist({
  playlist,
  currentTrackIndex = 0,
}: Props): JSX.Element {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onToggle}
        variant="audioplayer"
        aria-label="Playlist"
        icon={<RiPlayListAddFill size={22} />}
      />

      {/* <Slide
        direction="bottom"
        in={isOpen}
        style={{
          position: "fixed",
          width: "400px",
          // pointerEvents: "none",
          // paddingBottom: "3.5rem",
          zIndex: -1,
        }}
      > */}

      {true && (
        <div
          className={`fixed right-0 bottom-14 ${
            isOpen ? "top-0 sm:top-44" : "top-[100vh]"
          } z-[-1] w-screen overflow-y-scroll rounded bg-white py-2 text-text shadow-player transition-all duration-500 scrollbar-hide sm:w-[400px]`}
        >
          <div className="flex w-full flex-col justify-center text-sm">
            {[...playlist].splice(currentTrackIndex).map((track) => (
              <div
                key={track.id}
                className="flex h-14 w-full items-center gap-4 rounded p-4 hover:bg-bgc focus:bg-bgc"
              >
                <div className="relative h-[38px] w-[38px] shrink-0 border border-lightgray">
                  <Image
                    src={track.coverUri}
                    objectFit="cover"
                    layout="fill"
                    alt={track.name}
                  />
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
            ))}
          </div>
        </div>
      )}
    </>
  );
}
