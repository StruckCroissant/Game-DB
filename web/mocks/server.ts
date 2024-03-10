import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import { config } from "./config";

let workerActive = false;

export const server = setupServer(...handlers);

export async function startServer() {
  if (workerActive) return;

  server.listen(config.handlerConfigs);
  workerActive = true;
}

export async function stopServer() {
  server.close();
  workerActive = false;
}
