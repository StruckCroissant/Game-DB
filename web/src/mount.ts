import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import type { Router } from "vue-router";
import { addAppConfigs, type AppConfigs } from "./app-configs";

import AppVue from "./App.vue";
import type { Pinia } from "pinia";
import { configs } from "./router/configs";
import type { RouterConfigs } from "./router/configs";
import { addRouterConfigs } from "./router";
import {
  MockEndpointCallback,
  MockEndpointOptions,
} from "../test/mock-endpoint";

export type mountParameters = {
  router: Router;
  pinia: Pinia;
};

export type mountContext = Partial<{
  routerContext: RouterConfigs;
  appContext: AppConfigs;
}>;

declare global {
  interface Window {
    mockEndpoint: MockEndpointCallback;
  }
}

export async function mount(
  { router, pinia }: mountParameters,
  { routerContext, appContext }: mountContext = {}
): Promise<void> {
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
