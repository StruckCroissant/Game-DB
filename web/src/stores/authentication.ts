import { defineStore } from "pinia";
import {
  updateAuthListeners,
  clearAuth,
} from "@/services/authentication/authenticationService";

export const useAuthenticationStore = defineStore("Authentication", {
  state: () => ({
    isAuthenticated: false,
    basicAuthToken: "",
  }),
  actions: {
    addBasicAuth(username: string, password: string) {
      this.basicAuthToken = "basic " + btoa(`${username}:${password}`);
      this.isAuthenticated = true;
      updateAuthListeners(this.basicAuthToken);
    },
    removeAuthToken() {
      this.basicAuthToken = "";
      this.isAuthenticated = false;
      clearAuth();
    },
  },
});
