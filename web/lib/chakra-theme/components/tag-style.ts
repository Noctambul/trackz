import { ComponentStyleConfig } from "@chakra-ui/react";

const TagStyle: ComponentStyleConfig = {
  // All parts of multipart components can be found in the @chakra-ui/anatomy package,
  // the menuAnatomy has as well these parts: button, list, groupTitle, command, divider
  parts: ["container"],
  baseStyle: {
    container: {
      padding: "2",
    },
  },
  variants: {
    solid: {
      container: {},
    },
  },
};

export default TagStyle;
