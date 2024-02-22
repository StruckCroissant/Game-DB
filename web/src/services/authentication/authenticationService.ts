import {
  clearAxiosAuthorization,
  updateAxiosAuthorization,
} from "@/config/axiosConfig";

const authKey = "auth";

export function updateAuthListeners(basicAuthToken: string) {
  window.localStorage.setItem(authKey, basicAuthToken);
  updateAxiosAuthorization(basicAuthToken);
}

export function clearAuth(): void {
  window.localStorage.removeItem(authKey);
  clearAxiosAuthorization();
}
