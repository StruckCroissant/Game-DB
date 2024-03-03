import { useLogin, useRegister } from "./authenticationHttp";
import { isUser, type User } from "@/types";

vi.mock("@/stores/authentication");

describe("authenticationHttp tests", () => {
  describe("useLogin tests", () => {
    it("Should login and pass username and password should succeed", async () => {
      const loginState = useLogin(() => ({
        username: "jdeveloper",
        password: "test",
      }));

      const loginResult = await loginState.doLogin();
      expect(isUser(loginResult)).toBe(true);
    });

    it.skip("Should login and pass username and password should pass data to the authStore", () => {});
  });

  describe("useRegister tests", () => {
    it.skip("placeholder", () => {});
  });
});
