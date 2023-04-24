import { defineStore } from 'pinia';
import { ref } from "vue";
import type { Ref, UnwrapRef } from "vue";

export const useAuthenticationStore = defineStore('authentication', (): authentication => {
    const isAuthenticated: Ref<UnwrapRef<boolean>> = ref(false);

    return { isAuthenticated };
});

interface authentication {
    isAuthenticated: Ref<UnwrapRef<boolean>>
}