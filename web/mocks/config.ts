import type { SharedOptions } from "msw";

export const config: {
  baseUrl: string;
  handlerConfigs: SharedOptions;
} = {
  baseUrl: "http://localhost:5173",
  handlerConfigs: {
    onUnhandledRequest(request, print) {
      // Makes sure we don't get unhandled request warnings about source maps
      if (request.url.toString().startsWith(config.baseUrl)) return;

      print.warning();
    },
  },
};
