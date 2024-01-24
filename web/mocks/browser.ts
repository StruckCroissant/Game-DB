import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { http } from "msw";

export const worker = setupWorker(...handlers);

window["msw"] = {
  worker,
  http,
};
