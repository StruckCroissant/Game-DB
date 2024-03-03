/// <reference types="vitest/globals" />
import { startServer, stopServer } from "./mocks/server";

beforeAll(async () => {
  await startServer();
});

afterAll(async () => {
  vi.clearAllMocks();
  vi.resetAllMocks();
  vi.restoreAllMocks();
  await stopServer();
});
