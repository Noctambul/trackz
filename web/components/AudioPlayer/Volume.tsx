import { useAudio } from "context/AudioContext";

import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Slider,
  SliderFilledTrack,
  SliderTrack,
} from "@chakra-ui/react";
import { TbVolume, TbVolume2, TbVolume3 } from "react-icons/tb";

export default function Volume({}): JSX.Element {
  const { volume, setVolume, isMuted, toggleMute } = useAudio();

  const VolumeIcon = isMuted ? TbVolume3 : volume > 0.4 ? TbVolume : TbVolume2;

  return (
    <>
      <Popover offset={[-6, 0]} placement="top" trigger="hover">
        <PopoverTrigger>
          <button type="button" onClick={toggleMute}>
            <VolumeIcon
              className="mr-2 text-2xl"
              aria-label={isMuted ? "Unmute" : "Mute"}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent
          bg="bgc"
          border={0}
          w={12}
          pt={4}
          pb={1}
          borderRadius={0}
        >
          <PopoverBody className="flex items-center justify-center">
            <Slider
              aria-label="Track volume"
              min={0}
              max={100}
              value={volume * 100}
              onChange={(vol) => setVolume(vol / 100)}
              h={28}
              orientation="vertical"
            >
              <SliderTrack boxSize={3} borderRadius="1.75rem">
                <SliderFilledTrack bg="primary" />
              </SliderTrack>
            </Slider>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {/*       
      <div className="ml-2 flex items-center justify-center pl-2">
      </div> */}
    </>
  );
}
