import { Problem } from ".";

export const createProblem = (
  type: string,
  title: string,
  message: string,
  status: number,
  path: string | undefined,
  timestamp: string | undefined
): Problem => ({
  type,
  title,
  message,
  status,
  path,
  timestamp,
});
