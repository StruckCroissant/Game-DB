import { startWorker } from "../../mocks/browser";
import { config } from "./config";

Cypress.on("test:before:run:async", async () => {
  await startWorker({
    onUnhandledRequest(request, print) {
      // Makes sure we don't get unhandled request warnings about source maps
      if (request.url.toString().startsWith(config.baseUrl)) return;

      print.warning();
    },
  });
});
