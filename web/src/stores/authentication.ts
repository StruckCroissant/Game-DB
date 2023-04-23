import { defineStore } from 'pinia';

export const useAuthenticationStore = defineStore('authentication', (): {} => {
    const isAuthenticated: boolean = false;

    function getIsAuthenticated(): boolean {
        return isAuthenticated;
    }

    return { getIsAuthenticated };
});