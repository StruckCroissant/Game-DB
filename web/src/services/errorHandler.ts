import { useToast } from "@/stores/toastStore";
import { isAxiosError, isProblem } from "@/types";

export function handleAxiosError(error: unknown) {
  const toastStore = useToast();
  const message =
    isProblem(error) || isAxiosError(error)
      ? error.message
      : "An unexpected error occurred";

  toastStore.error({ text: message });
}
