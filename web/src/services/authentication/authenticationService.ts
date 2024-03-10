import {
  clearAxiosAuthorization,
  updateAxiosAuthorization,
} from "@/config/axiosConfig";

const AUTH_KEY = "auth";

export function updateAuthListeners(basicAuthToken: string) {
  window.localStorage.setItem(AUTH_KEY, basicAuthToken);
  updateAxiosAuthorization(basicAuthToken);
}

export function clearAuth(): void {
  window.localStorage.removeItem(AUTH_KEY);
  clearAxiosAuthorization();
}

export function createBasicAuthToken(username: string, password: string) {
  return "basic " + btoa(`${username}:${password}`);
}
