import { Problem } from ".";

export function createProblem(
  title: string,
  status: number,
  detail: string,
  type = "about:blank",
  timestamp: string | undefined,
  instance: string | undefined
): Problem {
  return {
    type,
    title,
    detail,
    status,
    timestamp,
    instance,
  };
}
