import { createApp as createAppVue } from "vue";

import type { App } from "vue";
import { configs } from "./configs";

import AppVue from "./App.vue";

export type AppConfigs = {
  errorHandler: (err: unknown) => void;
};

function addAppConfigs(app: App<Element>, configs: AppConfigs) {
  app.config.errorHandler = configs.errorHandler;
}

export function createApp(): App {
  const app = createAppVue(AppVue);
  addAppConfigs(app, configs);

  return app;
}
