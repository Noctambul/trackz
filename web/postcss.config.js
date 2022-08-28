module.exports = {
  plugins: {
    /**
     * Use postcss-import to handle Tailwind '@layer base' modification in different files.
     * @see {@link https://github.com/tailwindlabs/tailwindcss.com/issues/991} an issue concerning the problem
     * @see {@link https://tailwindcss.com/docs/using-with-preprocessors#build-time-imports} the tailwind preprocessor page
     */
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
