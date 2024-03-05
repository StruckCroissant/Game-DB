import { updateAuthListeners, clearAuth } from "./authenticationService";
import {
  updateAxiosAuthorization,
  clearAxiosAuthorization,
} from "@/config/axiosConfig";

vi.mock("@/config/axiosConfig");

const AUTH_KEY = "auth";

describe("Authentication service tests", () => {
  it("Should set auth into local storage", () => {
    const expectedData = "test";

    updateAuthListeners(expectedData);
    expect(window.localStorage.getItem(AUTH_KEY)).toEqual(expectedData);
    expect(updateAxiosAuthorization).toHaveBeenCalledWith(expectedData);
  });

  it("Should clear auth from local storage", () => {
    window.localStorage.setItem(AUTH_KEY, "test");

    clearAuth();

    expect(window.localStorage.getItem(AUTH_KEY)).toBeNull();
    expect(clearAxiosAuthorization).toHaveBeenCalled();
  });
});
