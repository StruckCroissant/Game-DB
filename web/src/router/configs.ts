import * as _ from "lodash";
import { isAuthenticated } from "@/services/authentication/authenticationService";
import { RouterConfigs } from ".";
import { RouteNames } from "./routes";

export const configs: RouterConfigs = {
  beforeEach(to, from, next) {
    const routeRequiresAuth = to.matched.some(
      (record) => record.meta.requiresAuth
    );
    const routeWithTitle = to.matched
      .slice()
      .reverse()
      .find((record) => record.meta.title);
    const routeIsAuth = to.matched.some(
      (record) =>
        record.name &&
        [RouteNames.LOGIN, RouteNames.REGISTER, RouteNames.AUTH].includes(
          record?.name?.toString()
        )
    );

    if (routeWithTitle && _.isString(routeWithTitle.meta.title)) {
      document.title = routeWithTitle.meta.title;
    }
    if (routeRequiresAuth && !isAuthenticated()) {
      next({ name: RouteNames.AUTH });
      return;
    }
    if (routeIsAuth && isAuthenticated()) {
      next({ name: RouteNames.HOME });
      return;
    }

    next();
  },
};
