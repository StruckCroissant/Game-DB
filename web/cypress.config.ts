import { defineConfig } from "cypress";
import { configureVisualRegression } from "cypress-visual-regression/dist/plugin";
import { config } from "./mocks/config";
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
    async setupNodeEvents(on, config) {
      (await import("@cypress/code-coverage/task")).default(on, config);
      configureVisualRegression(on);

      return config;
    },
  },
  downloadsFolder: "./cypress/downloads",
  fixturesFolder: "./cypress/fixtures",
  screenshotsFolder: "./cypress/screenshots/actual",
  videosFolder: "./cypress/videos",
});
