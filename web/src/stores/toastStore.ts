import { defineStore } from "pinia";
export type ToastStatus = "success" | "warning" | "error";

export interface ToastInterface {
  text: string;
  status: ToastStatus;
  id: number;
  isError: () => boolean;
  isWarning: () => boolean;
  isSuccess: () => boolean;
}

export type ToastPayload = {
  timeout?: number;
  text: string;
};

const defaultTimeout = 10000;

export const createToast = (text: string, status: ToastStatus): Toast =>
  new Toast(text, status);
class Toast implements ToastInterface {
  text: string;
  status: ToastStatus;
  id: number;

  constructor(text: string, status: ToastStatus) {
    this.text = text;
    this.status = status;
    this.id = Math.round(Math.random() * 1000);
  }

  isError() {
    return this.status === "error";
  }
  isSuccess() {
    return this.status === "success";
  }
  isWarning() {
    return this.status === "warning";
  }
}

export const useToast = defineStore("toast", {
  state: (): {
    toasts: Toast[];
  } => ({
    toasts: [],
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
      const existingToastIdx: number = this.toasts.findIndex(
        (toast: Toast) => toast.id == toastId
      );
      this.toasts.splice(existingToastIdx, 1);
    },
  },
});
