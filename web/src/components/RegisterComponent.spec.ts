import { render } from "@testing-library/vue";
import { waitFor } from "@testing-library/dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import RegisterComponent from "./RegisterComponent.vue";

const useRouter = {
  push: vi.fn(),
};
vi.mock("vue-router", () => ({
  useRouter: () => useRouter,
  RouterLink: vi.fn(),
}));
vi.mock("@/services/network/authenticationHttp");

describe("RegisterComponent tests", () => {
  it("Should show inputs", () => {
    const { getByPlaceholderText, getByRole } = render(RegisterComponent);

    expect(getByRole("textbox", { name: "username" })).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("Should show validation errors on submit", async () => {
    const user = userEvent.setup();
    const { getByRole } = render(RegisterComponent);

    const submitButton = getByRole("button", { name: "Register" });
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        getByRole("alert", { name: /username-error.*/i })
      ).toBeInTheDocument();
      expect(
        getByRole("alert", { name: /password-error.*/i })
      ).toBeInTheDocument();
    });
  });

  it("Should validate when username and password are blank", async () => {
    const user = userEvent.setup();
    const { getByRole, getByPlaceholderText } = render(RegisterComponent);

    const usernameInput = getByRole("textbox", { name: "username" });
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByRole("button", { name: "Register" });

    user.type(passwordInput, "  ");
    user.type(usernameInput, "  ");
    user.click(submitButton);

    await waitFor(() => {
      expect(
        getByRole("alert", { name: /username-error.*/i })
      ).toBeInTheDocument();
      expect(
        getByRole("alert", { name: /password-error.*/i })
      ).toBeInTheDocument();
    });
  });

  it("Should submit successfully when username and password are provided", async () => {
    const user = userEvent.setup();
    const { getByRole, getByPlaceholderText, queryByRole } =
      render(RegisterComponent);

    const usernameInput = getByRole("textbox", { name: "username" });
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByRole("button", { name: "Register" });

    await user.type(passwordInput, "  ");
    await user.type(usernameInput, "  ");
    await user.click(submitButton);

    await user.type(passwordInput, "test");
    await user.type(usernameInput, "test");
    await user.click(submitButton);

    await waitFor(() => {
      expect(queryByRole("alert", { name: /username-error.*/i })).toBeNull();
      expect(queryByRole("alert", { name: /password-error.*/i })).toBeNull();
    });
    expect(useRouter.push).toHaveBeenCalledOnce();
  });
});
