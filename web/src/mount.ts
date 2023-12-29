import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { App } from "vue";
import type { Router } from "vue-router";
import { addAppConfigs, type AppConfigs } from "./configs";

import AppVue from "./App.vue";
import type { Pinia } from "pinia";
import { configs } from "./router/configs";
import type { RouterConfigs } from "./router/configs";
import { addRouterConfigs } from "./router";

export type mountParameters = {
  router: Router;
  pinia: Pinia;
};

export type mountContext = Partial<{
  routerContext: RouterConfigs;
  appContext: AppConfigs;
}>;

export function mount(
  { router, pinia }: mountParameters,
  { routerContext, appContext }: mountContext = {}
): void {
  const app = createApp(AppVue);

  app.use(router);
  app.use(pinia);
  app.component("FontAwesomeIcon", FontAwesomeIcon);
  app.mount("#app");

  if (appContext) {
    addAppConfigs(app, appContext);
  }
  if (routerContext) {
    addRouterConfigs(router, routerContext);
  }
}
