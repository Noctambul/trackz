import { extendTheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Button from "./components/button-style";

const tailwind = resolveConfig(tailwindConfig);
const colors = tailwind!.theme!.colors!;
// const fonts = tailwind!.theme!.fontFamily!;

const theme = extendTheme({
  colors,
  fonts: {
    heading: `"KumbhSans", sans-serif`,
    body: `"KumbhSans", sans-serif`,
  },
  components: {
    Button,
  },
});

export default theme;
