const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EA8C04",
        bgc: colors.black,
        // bgc: colors.red[400],
      },
    },
    fontFamily: {},
  },
  plugins: [],
};
