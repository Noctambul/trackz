import { extendTheme } from "@chakra-ui/react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const tailwind = resolveConfig(tailwindConfig);
const colors = tailwind!.theme!.colors!;

const theme = extendTheme({ colors });

export default theme;
