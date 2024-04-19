import { HttpResponse } from "msw";
import type { Problem } from "@/types/problem";

export function getErrorResource(
  initialValue: Problem,
  status = 500
): HttpResponse {
  return new HttpResponse(JSON.stringify(initialValue), {
    headers: { "Content-Type": "application/problem+json" },
    status,
  });
}

export function getFailedLoginResource() {
  return getErrorResource(
    {
      detail: "Username or password is incorrect",
      title: "Unauthorized",
      type: "Unauthorized",
      status: 401,
    },
    401
  );
}
