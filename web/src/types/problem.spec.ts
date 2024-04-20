import { AxiosError, AxiosResponse } from "axios";
import {
  createProblemErrorFromAxiosError,
  isAxiosError,
  Problem,
} from "./problem";

const problem: Problem = {
  title: "Something went wrong",
  detail: "Internal Server Error",
  status: 500,
};

const getAxiosError = (
  problemInput: Problem = problem,
  headers: Record<string, string> = {
    "content-type": "application/problem+json",
  }
) =>
  new AxiosError("Something went wrong", "500", {}, null, {
    data: problemInput,
    status: 500,
    statusText: "Internal Server Error",
    headers,
    config: {},
  });

describe("Problem type tests", () => {
  it("createProblemErrorFromAxiosError should accurately map values", () => {
    const problemError = createProblemErrorFromAxiosError(getAxiosError());

    expect(problemError).not.toBeNull();
    expect(problemError?.description).toBe(problem.title);
    expect(problemError?.message).toBe(problem.detail);
  });

  it("createProblemErrorFromAxiosError should handle missing headers", () => {
    const inputAxiosError = getAxiosError(problem, {});
    const problemError = createProblemErrorFromAxiosError(inputAxiosError);

    expect(problemError).toBe(null);
  });

  it("isAxiosError should return true for an Axios Error", () => {
    expect(isAxiosError(getAxiosError())).toBe(true);
  });
});
