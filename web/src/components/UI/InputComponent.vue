<script setup lang="ts">
import { ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useField } from "vee-validate";
import * as _ from "lodash";
import type { InputTypeHTMLAttribute, Ref } from "vue";
library.add(faEye, faEyeSlash);

interface Props {
  name: string;
  type?: InputTypeHTMLAttribute | undefined;
  initialValue?: string;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  initialValue: "",
  label: "",
});

const id = _.uniqueId(props.name);

const passwordShown: Ref<boolean> = ref(false);
const isPasswordInput: boolean = props.type === "password";
const concreteType: Ref<string> = ref(props.type);

function togglePasswordShown(): void {
  concreteType.value = passwordShown.value ? "password" : "text";
  passwordShown.value = !passwordShown.value;
}

//<editor-fold desc="Form Context">
const { value, errorMessage } = useField(props.name, undefined, {
  initialValue: props.initialValue,
});
//</editor-fold>
</script>

<template>
  <div :class="['rounded-input', errorMessage ? 'rounded-input--error' : '']">
    <div class="rounded-input__input-container">
      <input
        :id="id"
        :name="name"
        :type="concreteType"
        :placeholder="label"
        :aria-label="label"
        v-model="value"
        class="rounded-input__input"
      />
      <div
        v-if="isPasswordInput"
        @click="togglePasswordShown"
        class="rounded-input__end-icon"
      >
        <FontAwesomeIcon
          :icon="passwordShown ? faEyeSlash : faEye"
          aria-label="show password"
        />
      </div>
    </div>
    <div v-if="errorMessage" class="rounded-input__invalid-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped></style>
