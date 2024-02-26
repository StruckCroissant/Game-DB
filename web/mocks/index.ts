import { startWorker } from "./browser";
import { config } from "./config";

export async function initialize() {
  await startWorker({
    onUnhandledRequest(request, print) {
      // Makes sure we don't get unhandled request warnings about source maps
      if (request.url.toString().startsWith(config.baseUrl)) return;

      print.warning();
    },
  });
}
