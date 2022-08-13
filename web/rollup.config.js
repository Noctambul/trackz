import includePaths from "rollup-plugin-includepaths";

const config = {
  plugins: [includePaths({ paths: ["./"] })],
};

export default config;
