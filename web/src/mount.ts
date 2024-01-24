import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { App } from "vue";
import type { Router } from "vue-router";
import type { AppConfigs } from "./configs";

import AppVue from "./App.vue";
import type { Pinia } from "pinia";
import type { RouterConfigs } from "./router/configs";

type AppProps = {
  router: Router;
  pinia: Pinia;
};

type AppContext = {
  routerConfigs: RouterConfigs;
  appConfigs: AppConfigs;
};

function addAppConfigs(app: App<Element>, configs: AppConfigs) {
  app.config.errorHandler = configs.errorHandler;
}

function addRouterConfigs(
  router: Router,
  routerConfigs: RouterConfigs
): Router {
  if (routerConfigs.beforeEach) {
    router.beforeEach(routerConfigs.beforeEach);
  }

  return router;
}

export function mount(
  { router, pinia }: AppProps,
  { routerConfigs, appConfigs }: AppContext
): void {
  const app = createApp(AppVue);

  app.use(router);
  app.use(pinia);
  app.component("FontAwesomeIcon", FontAwesomeIcon);
  app.mount("#app");

  addAppConfigs(app, appConfigs);
  addRouterConfigs(router, routerConfigs);
}
