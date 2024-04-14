import { waitFor } from "@testing-library/vue";
import { usePersistentState } from "./usePersistentState";
import { withSetup } from "@/utilities/testHelpers";

type ItemType = {
  key: string;
  value: string | boolean | Record<string, unknown> | boolean;
  default: string | boolean | Record<string, unknown> | boolean | null;
};
const a = {
  b: {},
};
a["b"] = a;
const existingStringItem = { key: "exists", value: "ture", default: null };
const existingObjectItem = { key: "object", value: { a: "b" }, default: {} };
const circularItem = { key: "circular", value: a, default: {} };
const unserializableItem = {
  key: "unserializable",
  value: "{ 'a': 4, 'b }",
  default: {},
};

type UsePersistentStateReturn = ReturnType<typeof usePersistentState>;
function getComposable(
  item: ItemType,
  onError = () => null
): UsePersistentStateReturn {
  return withSetup<UsePersistentStateReturn>(() =>
    usePersistentState<typeof item.value>(item.key, item.default, { onError })
  ).instance;
}

describe("usePersistentStateTests", () => {
  beforeEach(() => {
    window.localStorage.setItem(
      existingStringItem.key,
      existingStringItem.value
    );
    window.localStorage.setItem(
      unserializableItem.key,
      unserializableItem.value
    );
    window.localStorage.setItem(
      existingObjectItem.key,
      JSON.stringify(existingObjectItem.value)
    );
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  it("Should get existing item", async () => {
    const { persistentValue } = getComposable(existingStringItem);

    await waitFor(() => {
      expect(persistentValue.value).toEqual(existingStringItem.value);
    });
  });

  it("Should be able to parse object", async () => {
    const { persistentValue } = getComposable(existingObjectItem);

    await waitFor(() => {
      expect(persistentValue.value).toEqual(existingObjectItem.value);
    });
  });

  it("Should update existing item", async () => {
    const { persistentValue } = getComposable(existingStringItem);

    await waitFor(() => {
      expect(persistentValue.value).toEqual(existingStringItem.value);
    });

    persistentValue.value = "foobar";

    await waitFor(() => {
      const parsedItem = window.localStorage.getItem(existingStringItem.key);
      expect(parsedItem).toEqual(persistentValue.value);
    });
  });

  it("Should throw error when failing to set item", async () => {
    const onErrorMock = vi.fn();
    const { persistentValue } = getComposable(existingObjectItem, onErrorMock);

    persistentValue.value = circularItem.value;

    await waitFor(() => {
      expect(onErrorMock).toHaveBeenCalledOnce();
      expect(onErrorMock.mock.lastCall[0]).toBeInstanceOf(TypeError);
    });
  });

  it("Should gracefully handle unparseable item", async () => {
    const onErrorMock = vi.fn();
    const { persistentValue } = getComposable(unserializableItem, onErrorMock);

    await waitFor(async () => {
      expect(persistentValue.value).toStrictEqual(unserializableItem.default);
      expect(persistentValue.value).not.toEqual(unserializableItem.value);
      expect(onErrorMock).toHaveBeenCalledOnce();
      expect(onErrorMock.mock.lastCall[0]).toBeInstanceOf(SyntaxError);
    });
  });
});
