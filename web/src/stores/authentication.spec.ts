import { setActivePinia, createPinia } from "pinia";
import { useAuthenticationStore } from "./authentication";
import {
  updateAuthListeners,
  clearAuth,
  createBasicAuthToken,
} from "@/services/authentication/authenticationService";

vi.mock("@/services/authentication/authenticationService");

describe("Authentication store tests", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("addBasicAuth should authenticate", () => {
    const authStore = useAuthenticationStore();
    const username = "jschmo";
    const password = "test";
    const expectedToken = "basic abc123=";

    vi.mocked(createBasicAuthToken).mockReturnValue(expectedToken);

    authStore.addBasicAuth(username, password);

    expect(authStore.isAuthenticated).toBe(true);
    expect(authStore.basicAuthToken).toBe(expectedToken);
    expect(createBasicAuthToken).toHaveBeenCalledWith(username, password);
    expect(updateAuthListeners).toHaveBeenCalledWith(expectedToken);
  });

  it("removeAuthToken should clear auth", () => {
    const authStore = useAuthenticationStore();

    authStore.removeAuthToken();

    expect(authStore.isAuthenticated).toBe(false);
    expect(authStore.basicAuthToken).toBe("");
    expect(clearAuth).toHaveBeenCalledOnce();
  });
});
