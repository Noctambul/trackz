// @ts-nocheck
import { extendTheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const tailwind = resolveConfig(tailwindConfig);
const tailwindColors = tailwind!.theme!.colors!;

const theme = extendTheme({
  colors: {
    primary: tailwindColors.primary,
    bgc: tailwindColors.bgc,
    text: tailwindColors.text,
    subtext: tailwindColors.subtext,
  },
});

export default theme;
