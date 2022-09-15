const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: colors.zinc[900], //"#EA8C04",
      //   bgc: colors.white, //colors.zinc[900],
      //   text: colors.zinc[900], //colors.gray[100],
      //   subtext: colors.gray[600],
      //   // bgc: colors.red[400],
      // },
      colors: {
        primary: "#F3B2A6",
        bgc: "#1E2336",
        text: "#1E2336",
        subtext: "#636674",
        lightgray: colors.gray[400],
      },
    },
    fontFamily: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("autoprefixer"),
  ],
};
