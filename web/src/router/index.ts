import { createRouter as vueRouterCreate, createWebHistory } from "vue-router";

import type { NavigationGuard, Router } from "vue-router";
import { routes } from "./routes";
import { configs } from "./configs";

export type RouterConfigs = Record<string, NavigationGuard>;

export function addConfigs(router: Router, configs: RouterConfigs): Router {
  if (configs.beforeEach) router.beforeEach(configs.beforeEach);

  return router;
}

export function createRouter() {
  const router = vueRouterCreate({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
  });

  return addConfigs(router, configs);
}
