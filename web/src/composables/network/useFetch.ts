import { ref, unref } from "vue";
import type { Ref } from "vue";
import { axiosInstance as axios } from "@/config/axiosConfig";
import {
  DataOrProblemResponse,
  DataResponse,
  Problem,
  isDataResponse,
  isProblem,
} from "@/types";
import type { AxiosResponse, AxiosError } from "axios";
import { MaybeRefOrGetter } from "vue";
import { toValue } from "vue";
import _ from "lodash";

export interface NetworkComposable {
  error: Ref<AxiosError | unknown>;
  loading: Ref<boolean>;
}

interface AxiosBaseComposable extends AxiosComposable {
  doAction: (
    request: GetRequest | PostRequest
  ) => Promise<DataOrProblemResponse | null>;
}

export interface AxiosComposable extends NetworkComposable {
  response: Ref<AxiosResponse | null>;
  data: Ref<unknown>;
}

export interface UseFetch extends AxiosComposable {
  getData: () => Promise<DataOrProblemResponse | null>;
}

export interface UsePost extends AxiosComposable {
  postData: (inputData?: object) => Promise<DataOrProblemResponse | null>;
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

const isAxiosError = (err: unknown): err is AxiosError =>
  (err as AxiosError).isAxiosError;

const createProblem = (
  type: string,
  title: string,
  message: string,
  status: number,
  path: string | undefined,
  timestamp: string | undefined
): Problem => ({
  type,
  title,
  message,
  status,
  path,
  timestamp,
});

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

function useRequest(): AxiosBaseComposable {
  const data: Ref<DataResponse | null> = ref(null);
  const response: Ref<AxiosResponse | null> = ref(null);
  const error: Ref<Problem | null> = ref(null);
  const loading: Ref<boolean> = ref(false);

  const doAction = async (
    request: GetRequest | PostRequest
  ): Promise<DataOrProblemResponse | null> => {
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
      if (!isDataResponse(serverResponse.data)) throw serverResponse;

      data.value = response.value.data as DataResponse;
      error.value = null;
    } catch (errorResponse) {
      if (!isAxiosError(errorResponse))
        throw Error("An unexpected error ocurred");

      if (isProblem(errorResponse?.response?.data)) {
        error.value = errorResponse?.response?.data;
      } else {
        const reformattedError = createProblemFromAxiosError(
          errorResponse as AxiosError
        );
        error.value = reformattedError;
      }
      throw unref(error.value);
    } finally {
      loading.value = false;
    }

    return data.value ?? error.value;
  };

  return {
    data,
    response,
    error,
    loading,
    doAction,
  };
}

export function useFetch(endpoint: MaybeRefOrGetter<string>): UseFetch {
  const { doAction, ...rest } = useRequest();

  const getData = async () => {
    return await doAction({
      type: "get",
      endpoint: toValue(endpoint),
    });
  };

  return {
    getData,
    ...rest,
  };
}

export function usePost(
  endpoint: MaybeRefOrGetter<string>,
  reactiveInputData?: MaybeRefOrGetter<object>
): UsePost {
  const { doAction, ...rest } = useRequest();

  const postData = async (callInputData?: object) => {
    const data = callInputData ?? toValue(reactiveInputData);
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
