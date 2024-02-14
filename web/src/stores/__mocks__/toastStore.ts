import { ref } from "vue";
import type { Toast, ToastStatus } from "../toastStore";

const toastActions = {
  updateState: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
  remove: vi.fn(),
  pause: vi.fn(),
  unpause: vi.fn(),
};

export const toasts = ref<Toast[]>([]);

export const useToast = vi.fn(() => {
  return toastActions;
});

export function addToast(status: ToastStatus, text: string) {
  toasts.value.push({
    text,
    status,
    id: Math.random() * 1000,
  });
}
