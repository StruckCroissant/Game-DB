import { handleAxiosError } from "@/services/errorHandler";

export type AppConfigs = {
  errorHandler: (err: unknown) => void;
};

export const configs: AppConfigs = {
  errorHandler: handleAxiosError,
};
