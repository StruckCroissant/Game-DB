<script setup lang="ts">
import { toRef, ref } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useFieldMode } from "@/composables/validation/useFieldMode";
import * as _ from "lodash";
import type { InputTypeHTMLAttribute, Ref } from "vue";
import type { InteractionTypes } from "@/composables/validation/useFieldMode";
library.add(faEye, faEyeSlash);

interface Props {
  name: string;
  type?: InputTypeHTMLAttribute | undefined;
  initialValue?: string;
  label?: string;
  mode?: InteractionTypes;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
  initialValue: "",
  label: "",
  mode: "lazy",
});

const name = toRef(props, "name");
const id = _.uniqueId(name.value);

const passwordShown: Ref<boolean> = ref(false);
const isPasswordInput: boolean = props.type === "password";
const concreteType: Ref<string> = ref(props.type);

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
    <div class="rounded-input__input-container">
      <input
        :id="id"
        :name="name"
        :type="concreteType"
        :placeholder="label"
        :aria-label="label"
        v-on="handlers"
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
