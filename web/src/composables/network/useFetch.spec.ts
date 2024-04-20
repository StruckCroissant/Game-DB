import { useFetch, usePost } from "@/composables/network/useFetch";
import { ref } from "vue";
import { axiosInstance } from "@/config/axiosConfig";
import { waitFor } from "@testing-library/dom";
import { AxiosError, AxiosResponse } from "axios";
import {
  createProblemErrorFromProblem,
  isAxiosError,
  isProblemError,
  Problem,
} from "@/types/problem";

vi.mock("@/config/axiosConfig");

/* TODO this structure kindof sucks. There should be a clear
 * flow of data here
 */
const dataResponse = { data: "response" };
const problemData = {
  type: "about:blank",
  title: "error",
  detail: "error",
  status: 500,
  instance: "waow",
  timestamp: "now",
};
const errorResponseData = { error: "error" };
const defaultAxiosProblemData: Problem = {
  instance: "/api/test",
  status: 500,
  type: "about:blank",
  title: "Internal Server Error",
  detail: "An error occurred",
  timestamp: new Date().toISOString(),
};

const axiosResponseFactory = (
  data: Record<string, string | number>,
  status = 500,
  statusText = "Internal Server Error",
  headers = {},
  config?: object | undefined
): AxiosResponse => ({
  data,
  status,
  statusText,
  headers,
  config: { ...config },
});

const errorResponse: AxiosError = {
  message: "error message",
  config: {},
  request: undefined,
  status: "500",
  response: axiosResponseFactory(
    errorResponseData,
    defaultAxiosProblemData.status,
    "Internal Server Error",
    {
      url: `https://localhost${defaultAxiosProblemData.instance}`,
    }
  ),
  isAxiosError: true,
  toJSON: function (): object {
    throw new Error("Function not implemented.");
  },
  name: "AxiosError",
};

describe("useFetch and usePost success tests", () => {
  beforeEach(() => {
    vi.mocked(axiosInstance.get).mockReturnValue(
      Promise.resolve({ data: dataResponse })
    );
    vi.mocked(axiosInstance.post).mockReturnValue(
      Promise.resolve({ data: dataResponse })
    );
  });

  it("useFetch should call axios get", async () => {
    const endpoint = "test";
    const fetchResult = useFetch(ref(endpoint));

    await fetchResult.getData();
    expect(axiosInstance.get).toHaveBeenCalledWith(endpoint);
  });

  it("useFetch should set proper state", async () => {
    const fetchResult = useFetch(ref("test"));

    const result = await fetchResult.getData();
    expect(fetchResult.data.value).toStrictEqual({ data: "response" });
    expect(result).toStrictEqual({ data: "response" });
    expect(fetchResult.error.value).toBeNull();
    expect(fetchResult.response.value).toStrictEqual({ data: dataResponse });
  });

  it("usePost should call axios post", async () => {
    const endpoint = "test";
    const inputData = { test: "test" };
    const postResult = usePost(ref(endpoint));

    const result = await postResult.postData(inputData);
    expect(axiosInstance.post).toHaveBeenCalledWith(endpoint, inputData);

    expect(postResult.data.value).toStrictEqual({ data: "response" });
    expect(result).toStrictEqual({ data: "response" });
    expect(postResult.error.value).toBeNull();
    expect(postResult.response.value).toStrictEqual({ data: dataResponse });
  });

  it("usePost should default to provided reactive data", async () => {
    const endpoint = "test";
    const inputData = { test: "test" };
    const postResult = usePost(ref(endpoint), () => inputData);

    await postResult.postData();
    expect(axiosInstance.post).toHaveBeenCalledWith(endpoint, inputData);
  });

  it("usePost should set proper state", async () => {
    const postResult = usePost(ref("test"));

    const result = await postResult.postData({ test: "test" });

    expect(postResult.data.value).toStrictEqual({ data: "response" });
    expect(result).toStrictEqual({ data: "response" });
    expect(postResult.error.value).toBeNull();
    expect(postResult.response.value).toStrictEqual({ data: dataResponse });
  });
});

describe("useFetch and usePost error tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  it("useFetch should bubble Axios errors and set state", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(errorResponse);
    const fetchResult = useFetch(ref("test"));

    expect(fetchResult.loading.value).toBe(false);
    expect(fetchResult.getData()).rejects.not.toBeFalsy();
    await waitFor(() => expect(fetchResult.loading.value).toBe(true));
    await waitFor(() => expect(fetchResult.loading.value).toBe(false));
    await waitFor(() =>
      expect(isAxiosError(fetchResult.error.value)).toBe(true)
    );
  });

  it("useFetch should inherit proper Axios state", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(errorResponse);
    const fetchResult = useFetch(ref("test"));

    try {
      await fetchResult.getData();
    } catch (error) {
      expect(isAxiosError(error)).toBe(true);
      expect(isProblemError(error)).toBe(false);
      expect(error).toStrictEqual(errorResponse);
    }
  });

  it("useFetch should set state on problem format errors", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(
      new AxiosError(
        errorResponse.message,
        errorResponse.status,
        errorResponse.config,
        errorResponse.request,
        axiosResponseFactory(problemData, 500, "error", {
          "content-type": "application/problem+json",
        })
      )
    );

    const fetchResult = useFetch(ref("test"));
    expect(fetchResult.getData()).rejects.toStrictEqual(
      createProblemErrorFromProblem(problemData)
    );
    await waitFor(() => {
      expect(fetchResult.error.value).toStrictEqual(
        createProblemErrorFromProblem(problemData)
      );
    });
  });

  it("usePost should bubble Axios errors and set state", async () => {
    vi.mocked(axiosInstance.post).mockRejectedValue(errorResponse);
    const postResult = usePost(ref("test"));

    expect(postResult.loading.value).toBe(false);
    expect(postResult.postData({})).rejects.toBeTruthy();
    await waitFor(() => expect(postResult.loading.value).toBe(true));
    await waitFor(() => expect(postResult.loading.value).toBe(false));
    expect(isAxiosError(postResult.error.value)).toBe(true);
  });

  it("usePost should throw errors when no data is provided", () => {
    const postResult = usePost(ref("test"));

    expect(async () => await postResult.postData()).rejects.toStrictEqual(
      new Error("You must provide data for a post action")
    );
  });

  it("usePost should inherit proper Axios state", async () => {
    vi.mocked(axiosInstance.post).mockRejectedValue(errorResponse);
    const postResult = usePost(ref("test"), ref({ data: "test" }));

    const result = postResult.postData();

    expect(result).rejects.toEqual(errorResponse);
  });

  it("usePost should set state on problem format errors", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(
      new AxiosError(
        errorResponse.message,
        errorResponse.status,
        errorResponse.config,
        errorResponse.request,
        axiosResponseFactory(problemData, undefined, undefined, {
          "content-type": "application/problem+json",
        })
      )
    );
    const fetchResult = useFetch(ref("test"));
    expect(fetchResult.getData()).rejects.toStrictEqual(
      createProblemErrorFromProblem(problemData)
    );

    await waitFor(() => {
      expect(fetchResult.error.value).toStrictEqual(
        createProblemErrorFromProblem(problemData)
      );
    });
  });

  it("useFetch should rethrow unexpected error", async () => {
    const mockError = { test: "test" };
    vi.mocked(axiosInstance.get).mockResolvedValue(mockError);

    const fetchResult = useFetch(ref("test"));
    expect(fetchResult.getData()).rejects.toStrictEqual(mockError);
  });

  it("usePost should rethrow unexpected error", async () => {
    const mockError = { test: "test" };
    vi.mocked(axiosInstance.post).mockResolvedValue(mockError);

    const fetchResult = usePost(ref("test"));
    expect(fetchResult.postData({ test: "test" })).rejects.toStrictEqual(
      mockError
    );
  });
});
