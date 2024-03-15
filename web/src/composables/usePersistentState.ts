import { onMounted, ref } from "vue";
import * as _ from "lodash";

export function usePersistentState(label?: string, initialValue?: string) {
  const persistentValue = ref<string | null>(null);

  onMounted(() => {
    if (!label) return;

    const currentValue = window.localStorage.getItem(label);
    if (!currentValue && _.isString(initialValue))
      window.localStorage.setItem(label, initialValue);

    persistentValue.value = window.localStorage.getItem(label);
  });

  function update(newValue: string) {
    if (!label) return;
    window.localStorage.setItem(label, newValue);
    persistentValue.value = window.localStorage.getItem(label);
  }

  return {
    persistentValue,
    update,
  };
}
