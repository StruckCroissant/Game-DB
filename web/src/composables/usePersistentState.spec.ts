import { waitFor } from "@testing-library/vue";
import { usePersistentState } from "./usePersistentState";
import { withSetup } from "@/utilities/testHelpers";

describe("usePersistentStateTests", () => {
  const EXISTING_ITEM = { key: "exists", value: "ture" };

  beforeEach(() => {
    window.localStorage.setItem(EXISTING_ITEM.key, EXISTING_ITEM.value);
  });

  it("Should get existing item", async () => {
    const { persistentValue } = withSetup<
      ReturnType<typeof usePersistentState>
    >(() =>
      usePersistentState<typeof EXISTING_ITEM.key>(EXISTING_ITEM.key)
    ).instance;

    await waitFor(() => {
      expect(persistentValue.value).toEqual(EXISTING_ITEM.value);
    });
  });

  it("Should be able to parse object", async () => {
    const key = "key";
    const obj = { a: "b" };
    window.localStorage.setItem(key, JSON.stringify(obj));

    const { persistentValue } = withSetup<
      ReturnType<typeof usePersistentState>
    >(() => usePersistentState<typeof obj>(key)).instance;

    await waitFor(() => {
      expect(persistentValue.value).toEqual(obj);
    });
  });

  it("Should set item", () => {});

  it("Should update existing item", () => {});

  it("Should log error when failing to set item", () => {});

  it("Should log error when failing to get item", () => {});
});
