import _ from "lodash";
import { ref, watchEffect, onBeforeMount, UnwrapRef } from "vue";

type Options = {
  onError?: (error: Error) => null;
};
type AcceptedStateTypes = string | Record<string, unknown> | boolean;
type SerializerTypes = "generic" | "none";

const serializers: Record<
  string,
  {
    read: (value: string) => AcceptedStateTypes;
    write: (value: AcceptedStateTypes) => string;
  }
> = {
  generic: {
    read: (value: string) => JSON.parse(value),
    write: (value: AcceptedStateTypes) => JSON.stringify(value),
  },
  none: {
    read: (value: string) => value,
    write: (value: AcceptedStateTypes) => String(value),
  },
};

function guessSerializerType(
  rawValue: AcceptedStateTypes | null
): SerializerTypes {
  if (rawValue === undefined || rawValue === null) return "none";
  if (typeof rawValue === "object" || typeof rawValue === "boolean")
    return "generic";
  if (typeof rawValue === "string") return "none";
  return "none";
}

export function usePersistentState<T extends AcceptedStateTypes>(
  label = "",
  defaultValue: T | null = null,
  options: Options = {}
) {
  const { onError = () => null } = options;
  const serializer = serializers[guessSerializerType(defaultValue)];

  const persistentValue = ref<T | null>(null);

  watchEffect(update);
  onBeforeMount(update);

  function getItem(): T | null {
    const item = window.localStorage.getItem(label);
    if (item === null) return null;

    try {
      return serializer.read(item) as T;
    } catch (error) {
      if (_.isError(error)) onError(error);
      return null;
    }
  }

  function setItem(item: T) {
    try {
      window.localStorage.setItem(label, serializer.write(item));
    } catch (error) {
      if (_.isError(error)) onError(error);
      return null;
    }
  }

  function update() {
    if (!label) return;
    const currentItem = getItem();
    if (currentItem === null && defaultValue) {
      setItem(defaultValue);
    }

    if (persistentValue.value === null) {
      persistentValue.value = getItem() as UnwrapRef<T>;
    } else if (persistentValue.value !== currentItem) {
      setItem(persistentValue.value as T);
    }
  }

  return {
    persistentValue,
  };
}
