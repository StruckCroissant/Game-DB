import { createRouter, createWebHistory } from "vue-router";

import type { Router } from "vue-router";
import { routes } from "./routes";
import { configs } from "./configs";
import type { RouterConfigs } from "./configs";

export function addRouterConfigs(
  router: Router,
  configs: RouterConfigs
): Router {
  if (configs.beforeEach) router.beforeEach(configs.beforeEach);

  return router;
}

export function makeRouter() {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
  });

  return router;
}
