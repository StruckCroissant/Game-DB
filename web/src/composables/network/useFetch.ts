import { ref, unref } from "vue";
import type { Ref } from "vue";
import { axiosInstance as axios } from "@/config/axiosConfig";
import {
  Problem,
  isAxiosError,
  isDataResponse,
  isProblem,
  MaybeProblemPromise,
} from "@/types";
import type { AxiosResponse, AxiosError } from "axios";
import { MaybeRefOrGetter } from "vue";
import { toValue } from "vue";
import _ from "lodash";
import { createProblem } from "@/types/factories";

export interface NetworkComposable {
  error: Ref<AxiosError | unknown>;
  loading: Ref<boolean>;
}

interface AxiosBaseComposable<T> extends AxiosComposable<T> {
  doAction: <K extends T>(
    request: GetRequest | PostRequest
  ) => MaybeProblemPromise<K | null>;
}

export interface AxiosComposable<T> extends NetworkComposable {
  response: Ref<AxiosResponse | null>;
  data: Ref<T | null>;
}

export interface UseFetch<T> extends AxiosComposable<T> {
  getData: () => MaybeProblemPromise<T | null>;
}

export interface UsePost<T> extends AxiosComposable<T> {
  postData: (inputData?: object) => MaybeProblemPromise<T | null>;
}

interface Request {
  endpoint: string;
}

interface PostRequest extends Request {
  type: "post";
  data: object;
}

interface GetRequest extends Request {
  type: "get";
}

const createProblemFromAxiosError = (error: AxiosError): Problem => {
  return createProblem(
    error.response?.statusText ?? "Internal Server Error",
    "An error occurred",
    error.message,
    !_.isNaN(+(error?.code ?? "")) ? +(error.code ?? "") : 500,
    // TODO this should be the relative path
    error.response?.config.url,
    new Date().toISOString()
  );
};

function useRequest<T = unknown>(): AxiosBaseComposable<T> {
  const data: Ref<T | null> = ref(null);
  const response: Ref<AxiosResponse | null> = ref(null);
  const error: Ref<Problem | null> = ref(null);
  const loading: Ref<boolean> = ref(false);

  const doAction = async <K extends T>(
    request: GetRequest | PostRequest
  ): MaybeProblemPromise<K | null> => {
    try {
      loading.value = true;

      let serverResponse = null;
      switch (request.type) {
        case "get":
          serverResponse = await axios.get(request.endpoint);
          break;
        case "post":
          serverResponse = await axios.post(request.endpoint, request.data);
          break;
      }

      response.value = serverResponse;
      if (!isDataResponse(serverResponse)) throw serverResponse;

      data.value = response.value.data;
      error.value = null;
    } catch (errorResponse) {
      if (!isAxiosError(errorResponse)) {
        throw Error("An unexpected error ocurred");
      }

      if (isProblem(errorResponse?.response?.data)) {
        error.value = errorResponse?.response?.data;
      } else {
        const reformattedError = createProblemFromAxiosError(errorResponse);
        error.value = reformattedError;
      }
      throw unref(error.value);
    } finally {
      loading.value = false;
    }

    return (data.value as K) ?? error.value;
  };

  return {
    data,
    response,
    error,
    loading,
    doAction,
  };
}

export function useFetch<T>(endpoint: MaybeRefOrGetter<string>): UseFetch<T> {
  const { doAction, ...rest } = useRequest<T>();

  const getData = async () => {
    return await doAction<T>({
      type: "get",
      endpoint: toValue(endpoint),
    });
  };

  return {
    getData,
    ...rest,
  };
}

export function usePost<T>(
  endpoint: MaybeRefOrGetter<string>,
  reactiveInputData?: MaybeRefOrGetter<object>
): UsePost<T> {
  const { doAction, ...rest } = useRequest<T | null>();

  const postData = async (inputData?: object | undefined) => {
    const data = inputData ?? toValue(reactiveInputData);
    if (!data) throw new Error("You must provide data for a post action");

    return await doAction({
      type: "post",
      endpoint: toValue(endpoint),
      data,
    });
  };

  return {
    postData,
    ...rest,
  };
}
