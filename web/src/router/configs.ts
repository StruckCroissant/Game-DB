import { useAuthenticationStore } from "@/stores/authentication";
import { storeToRefs } from "pinia";
import { RouterConfigs } from ".";

export const configs: RouterConfigs = {
  beforeEach(to, from, next) {
    const authStore = useAuthenticationStore();
    const { isAuthenticated } = storeToRefs(authStore);

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!isAuthenticated.value) {
        next({ name: "auth" });
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
