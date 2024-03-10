import { useFetch } from "@/composables/network/useFetch";

vi.mock("@/composables/network/useFetch");

const useLoginMocks = {
  ...useFetch("/login"),
  doLogin: vi.fn(),
};

const useRegisterMocks = {
  ...useFetch("/register"),
  doRegister: vi.fn(),
};

export const useLogin = () => useLoginMocks;
export const useRegister = () => useRegisterMocks;
