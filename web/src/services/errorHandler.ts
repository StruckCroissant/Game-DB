import { useToast } from "@/stores/toastStore";
import { isAxiosError, isProblem } from "@/types";

export function handleError(error: unknown) {
  const toastStore = useToast();
  const message = isProblem(error)
    ? error?.detail
    : isAxiosError(error)
    ? error?.message
    : "An unexpected error occurred";

  toastStore.error({ text: message });
  throw error;
}
