import { http, HttpResponse } from "msw";
import type { SetupWorker } from "msw/browser";
import type { SetupServer } from "msw/node";
import { mockServer } from "./mock-server";

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

const ENDPOINT_MOCKS_KEY = `__ENDPOINT_MOCKS__`;

const makeMockEndpoint =
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

export const mockEndpoint = makeMockEndpoint({ mockServer });

export const activateStoredMocks = () => {
  const mocksRaw = localStorage.getItem(ENDPOINT_MOCKS_KEY);
  const mocks: { endpoint: string; options: MockEndpointOptions }[] = mocksRaw
    ? JSON.parse(mocksRaw)
    : [];
  mocks.forEach((mock) => mockEndpoint(mock.endpoint, mock.options));
};
