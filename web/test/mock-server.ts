import "cross-fetch/polyfill";
import { setupWorker } from "msw/browser";

export const mockServer = setupWorker();
mockServer.start();
