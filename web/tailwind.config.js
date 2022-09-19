const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F3B2A6",
        bgc: "#1E2336",
        text: "#1E2336",
        subtext: "#636674",
        lightgray: colors.gray[400],
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        kumbhsans: ["KumbhSans", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
    require("autoprefixer"),
  ],
};
