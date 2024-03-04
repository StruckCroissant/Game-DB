export const actions = {
  addBasicAuth: vi.fn(),
  removeAuthToken: vi.fn(),
};

export const useAuthenticationStore = vi.fn(() => ({
  ...actions,
}));
