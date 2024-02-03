import { flushPromises as flushP } from "@vue/test-utils";
import { vi } from "vitest";
import { provide } from "vue";
import { FormContext, FormContextKey } from "vee-validate";
import type { Component, defineComponent } from "vue";

export async function flushPromises() {
  await flushP();
  vi.advanceTimersByTime(5);
  await flushP();
}

export function getExtendedComponent(
  inputComponent: ReturnType<typeof defineComponent>,
  options: { mockFormCallback: () => FormContext }
): Component {
  return {
    ...inputComponent,
    setup(props, ctx) {
      let result = {};

      if (options.mockFormCallback) {
        const mockFormContext = options.mockFormCallback();
        /** @ts-ignore non-problematic type differences */
        provide(FormContextKey, mockFormContext);
      }

      if (inputComponent.setup) {
        const setupResult = inputComponent.setup(props, ctx);
        result = { ...result, ...setupResult };
      }

      return result;
    },
  };
}
