import { useToast } from "@/stores/toastStore";
import type {AxiosError} from "axios";
import * as zod from 'zod';

const Problem = zod.object({
  type: zod.string(),
  title: zod.string(),
  message: zod.string(),
  status: zod.number(),
});

function handleError(err: AxiosError) {
  const toastStore = useToast();
  const result = Problem.safeParse(err?.response?.data);
  const message = result.success ? result.data.message : err.message;
}

export default { handleError };
