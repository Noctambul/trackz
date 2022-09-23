const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   primary: "#F3B2A6",
      //   bgc: "#1E2336",
      //   text: "#1E2336",
      //   subtext: "#636674",
      //   lightgray: colors.gray[400],
      //   // #F9F9F9 light grey for background
      // },
      colors: {
        primary: colors.orange[400],
        text: colors.zinc[900],
        subtext: colors.zinc[500],
        lightgray: colors.zinc[300],
        bgc: "#F9F9F9",
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        kumbhsans: ["KumbhSans", "sans-serif"],
      },
      boxShadow: {
        player: "-2px -1px 4px 0px rgba( 0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar-hide"),
    require("autoprefixer"),
  ],
};
