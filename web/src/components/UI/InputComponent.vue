<script setup lang="ts">
import { toRef, computed, ref } from "vue";
import type { Ref } from "vue";
import { FieldContext, useField } from "vee-validate";
import { modes } from "@/services/validation/interactionModes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faEye, faEyeSlash);

interface Props {
  type?: string;
  initialValue?: string;
  name: string;
  label?: string;
  placeholder?: string;
  mode?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  initialValue: "",
  label: "",
  placeholder: "",
  mode: "aggressive",
});

const name = toRef(props, "name");

const passwordShown: Ref<boolean> = ref(false);
const isPasswordInput: boolean = props.type === "password";
const concreteType: Ref<string> = ref(props.type);

function togglePasswordShown(): void {
  concreteType.value = passwordShown.value ? "password" : "text";
  passwordShown.value = !passwordShown.value;
}

//<editor-fold desc="Form Context">
// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const { value, errorMessage, handleBlur, handleChange, meta }: FieldContext =
  useField(name, undefined, {
    initialValue: props.initialValue,
  });

type EventCallback = (e: Event, validate?: boolean) => void;
const handlers = computed(() => {
  const on: Record<string, EventCallback | EventCallback[]> = {
    blur: handleBlur,
    // default input event to sync the value
    // the `false` here prevents validation
    input: [(e: Event) => handleChange(e, false)],
  };

  // Get list of validation events based on the current mode
  const triggers = modes[props.mode]({
    errorMessage,
    meta,
  });

  // add them to the "on" handlers object
  triggers.forEach((t: string) => {
    if (Array.isArray(on[t])) {
      (on[t] as Array<EventCallback>).push(handleChange);
    } else {
      on[t] = handleChange;
    }
  });

  return on;
});
//</editor-fold>
</script>

<template>
  <div :class="['rounded-input', errorMessage ? 'rounded-input--error' : '']">
    <input
      :id="name"
      :name="name"
      :type="concreteType"
      :placeholder="placeholder"
      v-on="handlers"
      v-model="value"
      class="rounded-input__input"
      role="input"
    />
    <div v-if="errorMessage" class="rounded-input__invalid-message">
      {{ errorMessage }}
    </div>
    <div
      v-if="isPasswordInput"
      @click="togglePasswordShown"
      class="rounded-input__end-icon"
    >
      <FontAwesomeIcon :icon="passwordShown ? faEyeSlash : faEye" />
    </div>
  </div>
</template>

<style scoped></style>
