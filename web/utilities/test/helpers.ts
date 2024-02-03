import { flushPromises as flushP } from "@vue/test-utils";
import { vi } from "vitest";
import { provide } from "vue";
import { FormContextKey } from "vee-validate";
import type { Component, defineComponent } from "vue";
import { useForm } from "vee-validate";

type FormData = {
  validationSchema: Record<string, (...args: any[]) => string | boolean>;
};

export async function flushPromises() {
  await flushP();
  vi.advanceTimersByTime(5);
  await flushP();
}

export function getExtendedComponent(
  inputComponent: ReturnType<typeof defineComponent>,
  options: { mockFormData: FormData }
): Component {
  return {
    ...inputComponent,
    setup(props, ctx) {
      let result = {};

      if (options.mockFormData) {
        const useFormResult = useForm(options.mockFormData);
        /** @ts-ignore non-problematic type differences */
        provide(FormContextKey, useFormResult);
      }

      if (inputComponent.setup) {
        const setupResult = inputComponent.setup(props, ctx);
        result = { ...result, ...setupResult };
      }

      return result;
    },
  };
}
