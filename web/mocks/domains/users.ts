import { http, HttpResponse } from "msw";
import { endpoint } from "../baseUrls";
import { getFailedLoginResource, getErrorResource } from "../repos/error";
// Has to be imported this way because for whatever reason the default import fails
import * as users from "../fixtures/users.json";
import type { ErrorResource } from "../repos/error";
import type { StrictResponse } from "msw";

export const handlers = [
  http.post(
    endpoint("/login"),
    async ({
      request,
    }): Promise<StrictResponse<ErrorResource | typeof users.jdeveloper>> => {
      const loginRequest = await request.json();
      if (
        typeof loginRequest !== "object" ||
        !(loginRequest?.username in users)
      ) {
        return getFailedLoginResource();
      }

      return HttpResponse.json(users.jdeveloper);
    }
  ),
  http.post(
    endpoint("/register"),
    async ({ request }): Promise<StrictResponse<ErrorResource | boolean>> => {
      const registerRequest = await request.json();
      if (
        typeof registerRequest !== "object" ||
        registerRequest?.username in Object.keys(users)
      ) {
        return getErrorResource();
      }

      return HttpResponse.json(true);
    }
  ),
];
