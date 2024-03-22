import { handleError } from "./errorHandler";
import { useToast } from "@/stores/toastStore";

vi.mock("@/stores/toastStore");

describe("Error handler tests", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("Should return problem message", () => {
    const expectedErrorMessage = "test";

    handleError({
      isAxiosError: true,
      message: expectedErrorMessage,
    });

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });

  it("Should return axios message", () => {
    const expectedErrorMessage = "test";

    handleError({
      type: "test",
      title: "test",
      message: expectedErrorMessage,
      status: 0,
    });

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });

  it("Should return default message", () => {
    const expectedErrorMessage = "An unexpected error occurred";

    handleError({ test: "test" });

    expect(useToast().error).toHaveBeenCalledWith({
      text: expectedErrorMessage,
    });
  });
});
