import { computed } from "vue";
import { useField } from "vee-validate";
import { modes } from "@/services/validation/interactionModes";
import type { FieldContext } from "vee-validate";
import type { MaybeRefOrGetter } from "vue";

type EventCallback = (e: Event, validate?: boolean) => void;
export type InteractionModes = keyof typeof modes;

export function useFieldMode(
  name: MaybeRefOrGetter<string>,
  initialValue: string,
  mode: string
) {
  const { value, errorMessage, handleBlur, handleChange, meta }: FieldContext =
    useField(name, undefined, {
      initialValue: initialValue,
    });

  const handlers = computed(() => {
    const on: Record<string, EventCallback | EventCallback[]> = {
      blur: handleBlur,
      // default input event to sync the value
      // the `false` here prevents validation
      input: [(e: Event) => handleChange(e, false)],
    };

    // Get list of validation events based on the current mode
    const triggers = modes[mode]({
      errorMessage,
      meta,
    });

    // add them to the "on" handlers object
    triggers.forEach((trigger: string) => {
      if (Array.isArray(on[trigger])) {
        (on[trigger] as Array<EventCallback>).push(handleChange);
      } else {
        on[trigger] = handleChange;
      }
    });

    return on;
  });

  return {
    value,
    errorMessage,
    handlers,
  };
}
