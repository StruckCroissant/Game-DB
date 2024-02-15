import { ref } from "vue";

const useFetchMocks = {
  getData: vi.fn(),
  data: vi.fn(),
  response: vi.fn(),
  error: vi.fn(),
  loading: ref(false),
};

export const useFetch = () => useFetchMocks;
