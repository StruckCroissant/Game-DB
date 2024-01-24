import { defineConfig } from "cypress";
import path from "path";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4173",
    specPattern: "./**/*.spec.cy.ts",
    supportFile: "./cypress/support/e2e.ts",
    video: false,
    env: {
      "cypress-watch-and-reload": {
        watch: [
          path.resolve(process.cwd(), "public/**/*"),
          path.resolve(process.cwd(), "src/**/*"),
        ],
      },
    },
  },
  downloadsFolder: "./cypress/downloads",
  fixturesFolder: "./cypress/fixtures",
  screenshotsFolder: "./cypress/screenshots",
  videosFolder: "./cypress/videos",
});
