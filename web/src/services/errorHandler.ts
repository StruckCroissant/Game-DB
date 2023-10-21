import { useToast } from "@/stores/toastStore";

function handleError(err: Error) {
  const toastStore = useToast();

  toastStore.error({
    text: err.message,
  });
}

export default { handleError };
