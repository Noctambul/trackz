import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    NEXT_PUBLIC_IPFS_PROVIDER_URI: "https://gateway.pinata.cloud/ipfs/",
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: [
      "cypress/integration/**/*.cy.{js,jsx,ts,tsx}",
      "cypress/unit/**/*.cy.{js,jsx,ts,tsx}",
    ],
  },

  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});
