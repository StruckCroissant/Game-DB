import "cross-fetch/polyfill";
import { setupServer } from "msw/node";

export const mockServer = setupServer();
mockServer.listen();
