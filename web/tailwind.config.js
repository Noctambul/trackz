const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EA8C04",
        bgc: colors.zinc[900],
        text: colors.gray[100],
        subtext: colors.gray[400],
        // bgc: colors.red[400],
      },
    },
    fontFamily: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
