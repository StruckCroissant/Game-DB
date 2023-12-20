import errorHandler from "@/services/errorHandler";

export type AppConfigs = {
  errorHandler: (err: unknown) => void;
};

export const configs: AppConfigs = {
  errorHandler: (err: unknown) => {
    errorHandler.errorGuard(err);
  },
};
