import { useFetch, usePost } from "@/composables/network/useFetch";
import { ref } from "vue";
import { axiosInstance } from "@/config/axiosConfig";
import { waitFor } from "@testing-library/dom";
import { AxiosError, AxiosResponse } from "axios";
import { Problem, isProblem } from "@/types";

vi.mock("@/config/axiosConfig");

const dataResponse = { data: "response" };
const problemData = {
  type: "error",
  title: "error",
  message: "error",
  status: 500,
  path: "waow",
  timestamp: "now",
};
const errorResponseData = { error: "error" };
const defaultAxiosProblemData = {
  message: "error message",
  path: "https://localhost:1234/api/test",
  status: 500,
  type: "Internal Server Error",
  title: "An error occurred",
};

const axiosResponseFactory = (
  data: Record<string, string | number>,
  status = 500,
  statusText = "Internal Server Error",
  config?: object | undefined
): AxiosResponse => ({
  data,
  status,
  statusText,
  headers: {},
  config: { ...config },
});

const errorResponse = new AxiosError(
  "error message",
  "500",
  {},
  undefined,
  axiosResponseFactory(
    errorResponseData,
    defaultAxiosProblemData.status,
    "Internal Server Error",
    {
      url: defaultAxiosProblemData.path,
    }
  )
);

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
    expect(isProblem(fetchResult.error.value)).toBe(true);
  });

  it("useFetch should use inherit proper Axios state", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(errorResponse);
    const fetchResult = useFetch(ref("test"));

    let error: Problem | null = null;
    try {
      await fetchResult.getData();
    } catch (problem) {
      if (!isProblem(problem)) throw Error("Response is not a problem");
      error = problem;
    }

    expect(error?.type).toEqual(defaultAxiosProblemData.type);
    expect(error?.title).toEqual(defaultAxiosProblemData.title);
    expect(error?.message).toEqual(defaultAxiosProblemData.message);
    expect(error?.status).toEqual(defaultAxiosProblemData.status);
    expect(error?.path).toEqual(defaultAxiosProblemData.path);
  });

  it("useFetch should set sate on problem format errors", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(
      new AxiosError(
        errorResponse.message,
        errorResponse.status,
        errorResponse.config,
        errorResponse.request,
        axiosResponseFactory(problemData)
      )
    );

    const fetchResult = useFetch(ref("test"));
    expect(fetchResult.getData()).rejects.toStrictEqual(problemData);
    await waitFor(() =>
      expect(fetchResult.error.value).toStrictEqual(problemData)
    );
  });

  it("usePost should bubble Axios errors and set state", async () => {
    vi.mocked(axiosInstance.post).mockRejectedValue(errorResponse);
    const postResult = usePost(ref("test"));

    expect(postResult.loading.value).toBe(false);
    expect(postResult.postData({})).rejects.not.toBeFalsy();
    await waitFor(() => expect(postResult.loading.value).toBe(true));
    await waitFor(() => expect(postResult.loading.value).toBe(false));
    expect(isProblem(postResult.error.value)).toBe(true);
  });

  it("usePost should throw errors when no data is provided", () => {
    const postResult = usePost(ref("test"));

    expect(async () => await postResult.postData()).rejects.toStrictEqual(
      new Error("You must provide data for a post action")
    );
  });

  it("usePost should use inherit proper Axios state", async () => {
    vi.mocked(axiosInstance.post).mockRejectedValue(errorResponse);
    const postResult = usePost(ref("test"), ref({ data: "test" }));

    let error: Problem | null = null;
    try {
      await postResult.postData();
    } catch (problem) {
      if (!isProblem(problem)) throw Error("Response is not a problem");
      error = problem;
    }

    expect(error?.type).toEqual(defaultAxiosProblemData.type);
    expect(error?.title).toEqual(defaultAxiosProblemData.title);
    expect(error?.message).toEqual(defaultAxiosProblemData.message);
    expect(error?.status).toEqual(defaultAxiosProblemData.status);
    expect(error?.path).toEqual(defaultAxiosProblemData.path);
  });

  it("usePost should set sate on problem format errors", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(
      new AxiosError(
        errorResponse.message,
        errorResponse.status,
        errorResponse.config,
        errorResponse.request,
        axiosResponseFactory(problemData)
      )
    );

    const fetchResult = useFetch(ref("test"));
    expect(fetchResult.getData()).rejects.toStrictEqual(problemData);
    await waitFor(() =>
      expect(fetchResult.error.value).toStrictEqual(problemData)
    );
  });
});
