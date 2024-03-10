import { ref } from "vue";
import type { ToastInterface, ToastStatus } from "../toastStore";

const toastActions = {
  updateState: vi.fn(),
  success: vi.fn(),
  warning: vi.fn(),
  error: vi.fn(),
  remove: vi.fn(),
  pause: vi.fn(),
  unpause: vi.fn(),
};

export const toasts = ref<ToastInterface[]>([]);

const createToast = (status: ToastStatus, text: string): ToastInterface => ({
  status,
  text,
  id: Math.floor(Math.random() * 1000),
  isError: () => status === "error",
  isSuccess: () => status === "success",
  isWarning: () => status === "error",
});

export const useToast = vi.fn(() => {
  return toastActions;
});

export function addToast(status: ToastStatus, text: string) {
  toasts.value.push(createToast(status, text));
}
