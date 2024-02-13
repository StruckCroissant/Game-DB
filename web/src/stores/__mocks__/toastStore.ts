export function useToast() {
  const toasts = [];

  return {
    state: () => ({
      toasts,
    }),
    actions: {
      updateState: vi.fn(),
      success: (item) => {
        toasts.push(item);
      },
      warning: vi.fn(),
      error: vi.fn(),
      remove: vi.fn(),
      pause: vi.fn(),
      unpause: vi.fn(),
    },
  };
}
