import { ComponentStyleConfig } from "@chakra-ui/react";

const InputStyle: ComponentStyleConfig = {
  parts: ["field"],
  variants: {
    outline: {
      field: {
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
  },
  // defaultProps: {
  //   variant: "unstyled",
  // },
};

export default InputStyle;
