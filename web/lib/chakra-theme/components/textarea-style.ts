import { ComponentSingleStyleConfig } from "@chakra-ui/react";

const TextareaStyle: ComponentSingleStyleConfig = {
  baseStyle: {
    bg: "primary",
  },
  variants: {
    outline: {
      borderColor: "text",
      _hover: {
        borderColor: "subtext",
      },
      _focus: {
        borderColor: "primary",
        boxShadow: "0 0 0 1px orange",
      },
    },
  },
};

export default TextareaStyle;
