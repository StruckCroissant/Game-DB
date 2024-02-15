import { useFetch } from "@/composables/network/useFetch";

vi.mock("@/composables/network/useFetch");

const useLoginMocks = {
  ...useFetch(),
  doLogin: vi.fn(),
};

export const useLogin = () => useLoginMocks;
