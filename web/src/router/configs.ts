import { isAuthenticated } from "@/services/authentication/authenticationService";
import { RouterConfigs } from ".";

export const configs: RouterConfigs = {
  beforeEach(to, from, next) {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!isAuthenticated()) {
        next({ name: "auth" });
      } else {
        next();
      }
    } else {
      next();
    }
  },
};
