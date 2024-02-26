import { useAuthenticationStore } from "@/stores/authentication";
import { NetworkComposable, usePost } from "@/composables/network/useFetch";
import { toRefs } from "vue";
import type { MaybeProblemPromise, User, UserLoginRequest } from "@/types";

export function useLogin(loginRequest: UserLoginRequest): NetworkComposable & {
  doLogin: () => MaybeProblemPromise<User | null>;
} {
  const { username, password } = toRefs(loginRequest);

  const authStore = useAuthenticationStore();
  const login = usePost<User>("/login");

  const doLogin = async () => {
    const loginData = await login.postData({
      username: username.value,
      password: password.value,
    });
    authStore.addBasicAuth(username.value, password.value);
    return loginData;
  };

  return {
    ...login,
    doLogin,
  };
}

export function useRegister(
  registerRequest: UserLoginRequest
): NetworkComposable & {
  doRegister: () => MaybeProblemPromise<boolean | null>;
} {
  const { username, password } = toRefs(registerRequest);

  const register = usePost<boolean>("/register");

  const doRegister = async () => {
    return await register.postData({
      username: username.value,
      password: password.value,
    });
  };

  return {
    ...register,
    doRegister,
  };
}

export function logout() {
  const authStore = useAuthenticationStore();
  authStore.removeAuthToken();
}
