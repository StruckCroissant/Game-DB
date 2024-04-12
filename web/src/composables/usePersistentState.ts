import { ref, watchEffect, onBeforeMount, UnwrapRef } from "vue";

export function usePersistentState<
  T extends string | Record<string, unknown> | boolean | null
>(label = "", defaultValue?: T) {
  const persistentValue = ref<T | null>(null);

  watchEffect(update);
  onBeforeMount(update);

  function getItem(): T | null {
    const item = window.localStorage.getItem(label);

    if (item === null) return null;

    try {
      return JSON.parse(item) as T;
    } catch (error) {
      console.error("Could not parse item from local storage!", item);
      return null;
    }
  }

  function setItem(item: T) {
    try {
      window.localStorage.setItem(label, JSON.stringify(item));
    } catch (error) {
      console.error("Could not set item into local storage!", error);
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
