import { SetupWorker } from "msw/browser";
import { SetupServer } from "msw/node";
import { HttpResponse, http } from "msw";

type MockServer = { mockServer: SetupServer | SetupWorker };

export const makeMockEndpoint =
  ({ mockServer }: MockServer) =>
  (
    path: string,
    {
      body,
      method = "get",
      status = 200,
    }: {
      body: string | [unknown] | Record<string | number, unknown>;
      method?: "get" | "post" | "put" | "patch" | "delete";
      status?: number;
    }
  ) => {
    mockServer.use(
      http[method](path, () =>
        HttpResponse.json(body, {
          status: status,
        })
      )
    );
  };
