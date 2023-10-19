import { useToast } from "@/stores/errorStore";

function handleError(err: Error) {
  const toastStore = useToast();

  toastStore.error({
    text: err.message,
  });
}

export default { handleError };
