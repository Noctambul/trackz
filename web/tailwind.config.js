const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.amber[400], // or #EA8C04
        bgc: colors.black,
      },
    },
  },
  plugins: [],
};
