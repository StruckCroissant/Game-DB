import { defineConfig } from "cypress";
import cypressWatchAndReload from "cypress-watch-and-reload/plugins";
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
    setupNodeEvents(on, config) {
      const defaultBaseOptions = webpackPreprocessor.defaultOptions;
      const defaultWebpackOptions =
        webpackPreprocessor.defaultOptions.webpackOptions;
      const defaultRules =
        webpackPreprocessor.defaultOptions?.webpackOptions?.module?.rules ?? [];

      const preprocessorOptions = {
        ...defaultBaseOptions,
        webpackOptions: {
          ...defaultWebpackOptions,
          module: {
            rules: [
              ...defaultRules,
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                  {
                    loader: `ts-loader`,
                    options: {
                      transpileOnly: true,
                    },
                  },
                ],
              },
            ],
          },
          resolve: {
            alias: {
              "@game-db/application-test-utils": path.resolve(
                process.cwd(),
                `test/drivers/cypress/cypress-driver.ts`
              ),
            },
            extensions: [`.tsx`, `.ts`, `.js`],
          },
        },
      };
      on(`file:preprocessor`, webpackPreprocessor(preprocessorOptions));
      return cypressWatchAndReload(on, config);
    },
  },
});
