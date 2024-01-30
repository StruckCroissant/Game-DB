<script setup lang="ts">
import { toRef, ref } from "vue";
import type { Ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useFieldMode } from "@/composables/validation/useFieldMode";
library.add(faEye, faEyeSlash);

interface Props {
  name: string;
  type?: string;
  initialValue?: string;
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
const concreteType: Ref<string> = toRef(props, "type");

function togglePasswordShown(): void {
  concreteType.value = passwordShown.value ? "password" : "text";
  passwordShown.value = !passwordShown.value;
}

//<editor-fold desc="Form Context">
const { value, errorMessage, handlers } = useFieldMode(
  name,
  props.initialValue,
  props.mode
);
//</editor-fold>
</script>

<template>
  <div :class="['rounded-input', errorMessage ? 'rounded-input--error' : '']">
    <input
      :id="name"
      :name="name"
      :type="concreteType"
      :placeholder="placeholder"
      :aria-label="name"
      v-on="handlers"
      v-model="value"
      class="rounded-input__input"
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
