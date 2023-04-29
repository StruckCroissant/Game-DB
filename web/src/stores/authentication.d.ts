import type { Ref } from "vue";
export declare const useAuthenticationStore: import("pinia").StoreDefinition<"authentication", import("pinia")._UnwrapAll<Pick<authentication, "isAuthenticated">>, Pick<authentication, never>, Pick<authentication, never>>;
interface authentication {
    isAuthenticated: Ref<boolean>;
}
export {};
