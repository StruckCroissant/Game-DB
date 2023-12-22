import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import path from "path";

export default defineConfig({
  e2e: {
    specPattern: "test/**/*.spec.ts",
    baseUrl: "http://localhost:4173",
    supportFile: "test/drivers/cypress/support/application-test.ts",
    downloadsFolder: "test/drivers/cypress/downloads",
    fixturesFolder: "test/drivers/cypress/fixtures",
    screenshotsFolder: "test/drivers/cypress/screenshots",
    videosFolder: "test/drivers/cypress/videos",
    setupNodeEvents(on) {
      const prepocessorOptions = {
        ...webpackPreprocessor.defaultOptions,
        webpackOptions: {
          ...webpackPreprocessor.defaultOptions.webpackOptions,
          resolve: {
            alias: {
              "@game-db/application-test-driver": path.resolve(
                process.cwd(),
                `test/drivers/cypress/cypress-driver.ts`
              ),
            },
            extensions: [`.ts`, `.js`],
          },
        },
      };

      on("file:preprocessor", webpackPreprocessor(prepocessorOptions));
    },
  },
});
