import { useToast } from "@/stores/toastStore";
import { isError } from "lodash";

export function handleError(error: unknown): void {
  if (!isError(error)) return;
  console.log(error);
  const toastStore = useToast();

  toastStore.error({ text: error.message });
}
