import { AxiosError } from "axios";
import { handleError } from "./errorHandler";
import { useToast } from "@/stores/toastStore";

vi.mock("@/stores/toastStore");

describe("Error handler tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should return problem message", () => {
    const expectedErrorMessage = "test";

    expect(() =>
      handleError(new AxiosError(expectedErrorMessage))
    ).toThrowError(expectedErrorMessage);

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });

  it("Should return axios message", () => {
    const expectedErrorMessage = "test";

    expect(() =>
      handleError({
        type: "test",
        title: "test",
        message: expectedErrorMessage,
        status: 0,
      })
    ).toThrowError(expectedErrorMessage);

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });

  it("Should return default message", () => {
    const expectedErrorMessage = "An unexpected error occurred";
    const expectedError = new Error("beep boop");

    expect(() => handleError(expectedError)).toThrowError(expectedError);

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });
});
