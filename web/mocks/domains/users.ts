import { http, HttpResponse } from "msw";
import { endpoint } from "../baseUrls";
import user from "../fixtures/users.json";
import { getFailedLoginResource } from "../repos/error";
import type { ErrorResource } from "../repos/error";
import type { StrictResponse } from "msw";

export const handlers = [
  http.post(
    endpoint("/login"),
    async ({
      request,
    }): Promise<StrictResponse<ErrorResource | typeof user>> => {
      const loginRequest = await request.json();
      if (
        typeof loginRequest !== "object" ||
        (typeof loginRequest?.username === "string" &&
          loginRequest.username in Object.keys(user))
      ) {
        return HttpResponse.json(getFailedLoginResource());
      }

      return HttpResponse.json(user);
    }
  ),
];
