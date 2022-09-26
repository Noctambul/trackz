import { ComponentSingleStyleConfig } from "@chakra-ui/react";

const ButtonStyle: ComponentSingleStyleConfig = {
  // Styles for the base style
  baseStyle: {
    color: "bgc",
  },
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {
    solid: {
      bg: "text",
      _disabled: {
        bg: "mediumgray",
      },
      _loading: {
        bg: "mediumgray",
      },
      _hover: {
        _disabled: {
          bg: "mediumgray",
        },
        _loading: {
          bg: "mediumgray",
        },
        bg: "subtext",
      },
    },
    audioplayer: {
      bg: "transparent",
      color: "text",
      _hover: { bg: "bgc" },
      _focusVisible: { boxShadow: "0 0 0 2px rgba(0,0,0, 0.1)" },
    },
  },
  defaultProps: {},
  // defaultProps: {
  //   // Here we set the base variant as the default
  //   variant: "base",
  // },
};

export default ButtonStyle;
