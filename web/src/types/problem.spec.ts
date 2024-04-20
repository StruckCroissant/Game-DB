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
const axiosProblemResponse: AxiosResponse = {
  data: problem,
  status: 500,
  statusText: "Internal Server Error",
  headers: { "content-type": "application/problem+json" },
  config: {},
};
const axiosError: AxiosError = new AxiosError(
  "Something went wrong",
  "500",
  {},
  null,
  axiosProblemResponse
);

describe("Problem type tests", () => {
  it("createProblemErrorFromAxiosError should accurately map values", () => {
    const problemError = createProblemErrorFromAxiosError(axiosError);

    expect(problemError).not.toBeNull();
    expect(problemError?.description).toBe(problem.title);
    expect(problemError?.message).toBe(problem.detail);
  });

  it("isAxiosError should return true for an Axios Error", () => {
    expect(isAxiosError(axiosError)).toBe(true);
  });
});
