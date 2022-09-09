import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useTime } from "hooks/useTime";
import { BsSoundwave } from "react-icons/bs";

interface Props {
  /** The current progress in seconds */
  progress: number;
  /** The track duration in seconds */
  duration: number;
  disabled?: boolean;
  onSearch?: (seconds: number) => void;
  onSearchEnd?: () => void;
}

export default function ProgressBar({
  progress,
  duration,
  disabled,
  onSearch,
  onSearchEnd,
}: Props): JSX.Element {
  const { formatTime } = useTime();

  // const progressElt = (
  //   <div
  //     className={`"mx-3" h-0 w-full shrink rounded border border-gray-300`}
  //   />
  // );

  const inputElt = (
    <Slider
      aria-label="Track progress"
      className="mx-2"
      min={0}
      max={duration}
      value={progress}
      isDisabled={disabled}
      onChange={(value) => onSearch?.(value)}
      onMouseUp={onSearchEnd}
      onTouchEnd={onSearchEnd}
    >
      <SliderTrack bg="blue.100" boxSize={0.5}>
        <SliderFilledTrack bg="primary" />
      </SliderTrack>
      <SliderThumb boxSize={5} _hover={{ boxSize: 6, animation: 500 }}>
        <Box color="tomato" as={BsSoundwave} />
      </SliderThumb>
    </Slider>
  );

  return (
    <>
      <div className="hidden w-full items-center justify-between sm:flex sm:shrink">
        <div className="w-10 text-xs text-gray-300">{formatTime(progress)}</div>
        {inputElt}
        <div className="w-10 text-xs text-gray-300" aria-label="Duration">
          {formatTime(duration)}
        </div>
      </div>
    </>
  );
}
