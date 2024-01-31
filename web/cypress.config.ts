import { defineConfig } from "cypress";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";
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
      visualRegression: {
        type: "regression",
        baseDirectory: "cypress/snapshot/base",
        diffDirectory: "cypress/snapshot/diff",
        generateDiff: "always",
        failSilently: true,
      },
    },
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      configureVisualRegression(on);

      return config;
    },
  },
  downloadsFolder: "./cypress/downloads",
  fixturesFolder: "./cypress/fixtures",
  screenshotsFolder: "./cypress/screenshots/actual",
  videosFolder: "./cypress/videos",
});
