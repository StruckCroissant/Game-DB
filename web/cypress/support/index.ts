import { initialize } from "../../mocks";

Cypress.on("test:before:run:async", async () => {
  await initialize();
});
