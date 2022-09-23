import { ComponentStyleConfig } from "@chakra-ui/react";

const MenuStyle: ComponentStyleConfig = {
  // All parts of multipart components can be found in the @chakra-ui/anatomy package,
  // the menuAnatomy has as well these parts: button, list, groupTitle, command, divider
  parts: ["item"],
  baseStyle: {
    item: {
      color: "text",
      _focus: {
        color: "primary",
      },
    },
  },
};

export default MenuStyle;
