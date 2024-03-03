import { startWorker } from "../../mocks/browser";

Cypress.on("test:before:run:async", async () => {
  await startWorker();
});
