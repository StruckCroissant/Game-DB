import { ref } from "vue";
import type { Toast } from "../toastStore";

export const toasts = ref<Toast[]>([]);

const toastActions = {
  updateState: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
  remove: vi.fn(),
  pause: vi.fn(),
  unpause: vi.fn(),
};

export const useToast = vi.fn(() => {
  return toastActions;
});
