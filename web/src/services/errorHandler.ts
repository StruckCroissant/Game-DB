import { useToast } from "@/stores/toastStore";
import { AxiosError } from "axios";
import { problemSchema } from "@/common/schemas";

function errorGuard(err: unknown) {
  if (!(err instanceof AxiosError)) {
    return;
  }
  handleError(err);
}

function handleError(err: AxiosError) {
  const toastStore = useToast();
  const result = problemSchema.safeParse(err?.response?.data);
  const message = result.success ? result.data.message : err.message;

  toastStore.error({ text: message });
}

export default { errorGuard };
