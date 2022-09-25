import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderProps,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { BsSoundwave } from "react-icons/bs";

type Props = SliderProps;

export default function SliderRender({
  max,
  value,
  isDisabled,
  onChange,
  onChangeEnd,
}: Props): JSX.Element {
  const slider = useMemo(
    () => (
      <Slider
        aria-label="Track progress"
        min={0}
        max={max}
        value={value}
        isDisabled={isDisabled} // And duration === 0
        onChange={onChange}
        onChangeEnd={onChangeEnd}
        focusThumbOnChange={false}
      >
        <SliderTrack maxW={max} bg="blue.100" boxSize={0.5}>
          <SliderFilledTrack bg="primary" />
        </SliderTrack>
        <SliderThumb
          boxSize={{ base: 4, sm: 5 }}
          bg={{ base: "primary", sm: "white" }}
        >
          <Box color={{ base: "primary", sm: "tomato" }} as={BsSoundwave} />
        </SliderThumb>
      </Slider>
    ),
    [max, value, isDisabled, onChange, onChangeEnd]
  );

  return slider;
}
