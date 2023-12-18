import { createRouter, createWebHistory } from 'vue-router';
import {useAuthenticationStore} from "@/stores/authentication";
import { storeToRefs } from "pinia";

import type { Router } from 'vue-router';
import { routes } from "./routes";

/**
 * Routes section
 */
const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

/**
 * Router setup
 */
router.beforeEach((to, from, next) => {
  const authStore = useAuthenticationStore();
  const { isAuthenticated } = storeToRefs(authStore);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      next({ name: 'auth' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
