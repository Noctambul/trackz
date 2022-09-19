import { extendTheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const tailwind = resolveConfig(tailwindConfig);
const colors = tailwind!.theme!.colors!;
// const fonts = tailwind!.theme!.fontFamily!;

const theme = extendTheme({
  colors,
  // fonts: {
  //   heading: `"KumbhSans", sans-serif`,
  //   body: `"KumbhSans", sans-serif`,
  // },
});

export default theme;
