import { defineStore } from "pinia";
export type ToastStatus = "success" | "warning" | "error";

export type Toast = {
  text: string;
  status: ToastStatus;
  id: number;
};

export type ToastPayload = {
  timeout?: number,
  text: string
};

const defaultTimeout: number = 30000;

const createToast = (text: string, status: ToastStatus): Toast => ({
  text,
  status,
  id: Math.random() * 1000
});

export const useToast = defineStore("toast", {
  state: (): { toasts: Toast[] } => ({
    toasts: []
  }),
  actions: {
    updateState(payload: ToastPayload, status: ToastStatus) {
      const { text, timeout } = payload;
      const toast = createToast(text, status);
      this.toasts.push(toast);

      setTimeout(() => {
        this.toasts = this.toasts.filter((t) => t.id !== toast.id);
      }, timeout ?? defaultTimeout);
    },
    success(payload: ToastPayload) {
      this.updateState(payload, "success");
    },
    warning(payload: ToastPayload) {
      this.updateState(payload, "warning");
    },
    error(payload: ToastPayload) {
      this.updateState(payload, "error");
    },
    remove(toastId: number) {
      const existingToastIdx: number = this.toasts.findIndex((toast: Toast) => toast.id == toastId);
      this.toasts.splice(existingToastIdx, 1);
    },
  }
});