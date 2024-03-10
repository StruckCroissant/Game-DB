import { handleAxiosError } from "@/services/errorHandler";
import { AppConfigs } from "./mount";

export const configs: AppConfigs = {
  errorHandler: handleAxiosError,
};
