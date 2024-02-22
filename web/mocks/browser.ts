import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { http } from "msw";
import type { SetupWorker, StartOptions } from "msw/browser";

let workerActive = false;

export const worker = setupWorker(...handlers);

export async function startWorker(options: StartOptions | undefined) {
  if (workerActive) return;

  await worker.start(options);
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
