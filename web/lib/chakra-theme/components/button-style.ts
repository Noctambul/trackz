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
      _hover: {
        bg: "subtext",
      },
    },
    audioplayer: {
      bg: "white",
      color: "text",
      _hover: { bg: "bgc" },
    },
  },
  defaultProps: {},
  // defaultProps: {
  //   // Here we set the base variant as the default
  //   variant: "base",
  // },
};

export default ButtonStyle;
