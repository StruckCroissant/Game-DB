import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { App } from "vue";
import type { Router } from "vue-router";
import type { AppConfigs } from "./configs";

import AppVue from "./App.vue";
import type { Pinia } from "pinia";

export function addConfigs(app: App<Element>, configs: AppConfigs) {
  app.config.errorHandler = configs.errorHandler;
}

export function mount({
  router,
  pinia,
}: {
  router: Router;
  pinia: Pinia;
}): void {
  const app = createApp(AppVue);

  app.use(router);
  app.use(pinia);
  app.component("FontAwesomeIcon", FontAwesomeIcon);
  app.mount("#app");
}
