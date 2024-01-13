import errorHandler from "@/services/errorHandler";
import { App } from "vue";

export type AppConfigs = {
  errorHandler: (err: unknown) => void;
};

export const configs: AppConfigs = {
  errorHandler: (err: unknown) => {
    errorHandler.errorGuard(err);
  },
};

export function addAppConfigs(app: App<Element>, configs: AppConfigs) {
  app.config.errorHandler = configs.errorHandler;
}
