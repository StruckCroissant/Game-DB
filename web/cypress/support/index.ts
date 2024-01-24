import { worker } from "../../mocks/browser";
Cypress.on("test:before:run:async", async () => {
  await worker.start();
});
