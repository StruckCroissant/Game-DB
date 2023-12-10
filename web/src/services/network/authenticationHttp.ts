import { useAuthenticationStore } from "@/stores/authentication";
import type { NetworkComposable } from "@/composables/useFetch";
import { usePost } from "@/composables/useFetch";
import { toRefs } from "vue";
import type { UserLoginRequest } from "@/common/types";
import { userLoginSchema } from "@/common/schemas";

interface UseLogin extends NetworkComposable {
  doLogin: () => Promise<void>;
}

interface UseRegister extends NetworkComposable {
  doRegister: () => Promise<void>;
}

export function useLogin(loginRequest: UserLoginRequest): UseLogin {
  const { username, password } = toRefs(loginRequest);

  const authStore = useAuthenticationStore();
  const login = usePost("/login");

  const doLogin = async () => {
    await login.postData({
      username: username.value,
      password: password.value,
    });
    authStore.addBasicAuth(username.value, password.value);
  };

  return {
    loading: login.loading,
    error: login.error,
    doLogin,
  };
}

export function useRegister(registerRequest: UserLoginRequest): UseRegister {
  const { username, password } = toRefs(registerRequest);

  const register = usePost("/register");

  const doRegister = async () => {
    await register.postData({
      username: username.value,
      password: password.value,
    });
  };

  return {
    loading: register.loading,
    error: register.error,
    doRegister,
  };
}

export function logout() {
  const authStore = useAuthenticationStore();
  authStore.removeAuthToken();
}
