import { AxiosError, AxiosResponse } from "axios";
import {
  createProblemErrorFromAxiosError,
  isAxiosError,
  Problem,
} from "./problem";

const problem: Problem = {
  title: "Internal Server Error",
  detail: "Something went wrong",
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
    expect(problemError?.message).toBe(problem.title);
    expect(problemError?.description).toBe(problem.detail);
  });

  it("isAxiosError should return true for an Axios Error", () => {
    expect(isAxiosError(axiosError)).toBe(true);
  });
});
