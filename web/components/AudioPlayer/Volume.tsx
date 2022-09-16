import { useAudio } from "context/AudioContext";

import {
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { TbVolume, TbVolume2, TbVolume3 } from "react-icons/tb";

export default function Volume({}): JSX.Element {
  const { volume, setVolume, isMuted, toggleMute } = useAudio();

  const VolumeIcon = isMuted ? TbVolume3 : volume > 0.4 ? TbVolume : TbVolume2;

  return (
    <div className="ml-2 flex items-center justify-center pl-2">
      <button type="button" onClick={toggleMute}>
        <VolumeIcon
          className="mr-2 text-2xl"
          aria-label={isMuted ? "Unmute" : "Mute"}
        />
      </button>

      <Slider
        aria-label="Track volume"
        className="mx-2"
        min={0}
        max={100}
        value={volume * 100}
        onChange={(vol) => setVolume(vol / 100)}
        w={20}
      >
        <SliderTrack bg="blue.100" boxSize={0.5}>
          <SliderFilledTrack bg="primary" />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </div>
  );
}
