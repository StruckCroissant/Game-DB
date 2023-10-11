export declare const useAuthenticationStore: import("pinia").StoreDefinition<"Authentication", {
    isAuthenticated: boolean;
    basicAuthToken: string;
}, {}, {
    addBasicAuth(username: string, password: string): void;
    removeAuthToken(): void;
}>;
