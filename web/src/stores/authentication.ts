import { defineStore } from 'pinia';
import {updateAxiosIntercept} from "@/common/axiosConfig";

export const useAuthenticationStore = defineStore('Authentication', {
    state: () => ({
        isAuthenticated: false,
        basicAuthToken: ''
    }),
    actions: {
        addBasicAuth(username: string, password: string) {
            this.basicAuthToken = "basic " + btoa(`${username}:${password}`);
            this.isAuthenticated = true;
            updateAxiosIntercept(this.basicAuthToken);
        },
        removeAuthToken() {
            this.basicAuthToken = '';
            this.isAuthenticated = false;
            updateAxiosIntercept(this.basicAuthToken);
        }
    }
});