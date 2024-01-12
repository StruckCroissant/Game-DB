import { http, HttpResponse } from "msw";
import type { SetupWorker } from "msw/browser";
import type { SetupServer } from "msw/node";
import { mockServer } from "./mock-server";
import { mockEndpoint } from "./utils";

type MockServer = { mockServer: SetupServer | SetupWorker };
export type MockEndpointOptions = {
  body: string | unknown[] | Record<string | number, unknown>;
  method?: "get" | "post" | "put" | "patch" | "delete";
  status?: number;
};
export type MockEndpointCallback = (
  path: string,
  { body, method, status }: MockEndpointOptions
) => void;
export type MockEndpointExports = {
  makeMockEndpoint: ({ mockServer }: MockServer) => MockEndpointCallback;
};

const ENDPOINT_MOCKS_KEY = `__ENDPOINT_MOCKS__`;

export const makeMockEndpoint =
  ({ mockServer }: MockServer): MockEndpointCallback =>
  (path, { body, method = "get", status = 200 }) => {
    mockServer.use(
      http[method](path, () =>
        HttpResponse.json(body, {
          status: status,
        })
      )
    );
  };
