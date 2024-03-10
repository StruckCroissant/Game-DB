import { HttpResponse } from "msw";

export type ErrorResource = {
  message: string;
  status: number;
  title: string;
  type: string;
};

export function getErrorResource(
  initialValue: Partial<ErrorResource> = {},
  status = 500
) {
  return HttpResponse.json(
    {
      message: "Failed",
      status,
      title: "Request failed",
      type: "Server error",
      ...initialValue,
    },
    { status }
  );
}

export function getFailedLoginResource() {
  return getErrorResource(
    {
      message: "Username or Password is incorrect",
      title: "Unauthorized",
      type: "Unauthorized",
    },
    401
  );
}
