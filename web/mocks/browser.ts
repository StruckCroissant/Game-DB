import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { http } from "msw";
import { config } from "./config";
import type { SetupWorker } from "msw/browser";

let workerActive = false;

export const worker = setupWorker(...handlers);

export async function startWorker() {
  if (workerActive) return;

  await worker.start(config.handlerConfigs);
  workerActive = true;
}

export async function stopWorker() {
  worker.stop();
  workerActive = false;
}

declare global {
  interface Window {
    msw: {
      worker: SetupWorker;
      http: typeof http;
      workerActive: boolean;
    };
  }
}

window.msw = {
  worker,
  http,
  workerActive,
};
