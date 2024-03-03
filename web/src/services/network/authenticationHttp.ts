import { useAuthenticationStore } from "@/stores/authentication";
import { NetworkComposable, usePost } from "@/composables/network/useFetch";
import { toRefs, toValue } from "vue";
import type { MaybeProblemPromise, User, UserLoginRequest } from "@/types";
import type { MaybeRefOrGetter } from "vue";

export function useLogin(
  loginRequest: MaybeRefOrGetter<UserLoginRequest>
): NetworkComposable & {
  doLogin: () => MaybeProblemPromise<User | null>;
} {
  const authStore = useAuthenticationStore();
  const login = usePost<User>("/login");

  const doLogin = async () => {
    const loginRequestData = toValue(loginRequest);
    const loginData = await login.postData(loginRequestData);
    authStore.addBasicAuth(
      loginRequestData.username,
      loginRequestData.password
    );
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
