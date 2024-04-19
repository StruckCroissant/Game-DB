import { AxiosError } from "axios";
import { handleError } from "./errorHandler";
import { useToast } from "@/stores/toastStore";
import { ProblemError } from "@/types/problem";

vi.mock("@/stores/toastStore");

describe("Error handler tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should return problem message", () => {
    const expectedErrorMessage = "test";

    handleError(new ProblemError(expectedErrorMessage, expectedErrorMessage));

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });

  it("Should return axios message", () => {
    const expectedErrorMessage = "test";
    handleError(new AxiosError(expectedErrorMessage));

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });

  it("Should work with default error type", () => {
    const expectedErrorMessage = "An unexpected error occurred";
    const expectedError = new Error(expectedErrorMessage);

    handleError(expectedError);

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });
});
