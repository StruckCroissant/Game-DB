import { defineConfig } from "cypress";
import { config } from "./cypress/support/config";
import path from "path";

export default defineConfig({
  e2e: {
    baseUrl: config.baseUrl,
    specPattern: "./**/*.spec.cy.ts",
    supportFile: "./cypress/support/e2e.ts",
    video: true,
    env: {
      "cypress-watch-and-reload": {
        watch: [
          path.resolve(process.cwd(), "public/**/*"),
          path.resolve(process.cwd(), "src/**/*"),
        ],
      },
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);

      return config;
    },
  },
  downloadsFolder: "./cypress/downloads",
  fixturesFolder: "./cypress/fixtures",
  screenshotsFolder: "./cypress/screenshots",
  videosFolder: "./cypress/videos",
});
