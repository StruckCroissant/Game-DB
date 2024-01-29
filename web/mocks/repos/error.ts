export type ErrorResource = {
  message: string;
  status: number;
  title: string;
  type: string;
};

export function getErrorResource(initialValue: Partial<ErrorResource> = {}) {
  return {
    message: "Failed",
    status: 500,
    title: "Request failed",
    type: "Server error",
    ...initialValue,
  };
}

export function getFailedLoginResource() {
  return getErrorResource({
    message: "Username or Password is incorrect",
    status: 401,
    title: "Unauthorized",
    type: "Unauthorized",
  });
}
