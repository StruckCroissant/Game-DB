import { ref } from "vue";
import type { Ref } from "vue";
import { axiosInstance as axios } from "@/config/axiosConfig";
import type { AxiosResponse, AxiosError } from "axios";
import { MaybeProblemPromise } from "@/types";

export interface NetworkComposable {
  error: Ref<AxiosError | unknown>;
  loading: Ref<boolean>;
}

interface AxiosBaseComposable extends AxiosComposable {
  doAction: (request: GetRequest | PostRequest) => Promise<any>;
}

export interface AxiosComposable extends NetworkComposable {
  response: Ref<AxiosResponse | null>;
  data: Ref<any>;
}

export interface UseFetch extends AxiosComposable {
  getData: () => Promise<void>;
}

export interface UsePost extends AxiosComposable {
  postData: <T>(inputData: any) => MaybeProblemPromise<T>;
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

function useRequest(): AxiosBaseComposable {
  const data: Ref<any> = ref(null);
  const response: Ref<AxiosResponse | null> = ref(null);
  const error: Ref<AxiosError | unknown> = ref(null);
  const loading: Ref<boolean> = ref(false);

  const doAction = async (request: GetRequest | PostRequest): Promise<any> => {
    try {
      loading.value = true;

      let serverResponse = null;
      switch (request.type) {
        case "get":
          serverResponse = await axios.get(request.endpoint);
          break;
        case "post":
          serverResponse = await axios.post(request.endpoint, request.data);
      }

      response.value = serverResponse;
      data.value = response.value.data.data;
      error.value = null;
    } catch (axiosError) {
      error.value = axiosError;
      throw axiosError;
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    response,
    error,
    loading,
    doAction,
  };
}

export function useFetch(endpoint: string): UseFetch {
  const { data, response, error, loading, doAction } = useRequest();

  const getData = async () => {
    return await doAction({
      type: "get",
      endpoint: endpoint,
    });
  };

  return {
    getData,
    data,
    response,
    error,
    loading,
  };
}

export function usePost(endpoint: string): UsePost {
  const { data, response, error, loading, doAction } = useRequest();

  const postData = async (inputData: any) => {
    return await doAction({
      type: "post",
      endpoint: endpoint,
      data: inputData,
    });
  };

  return {
    postData,
    data,
    response,
    error,
    loading,
  };
}
