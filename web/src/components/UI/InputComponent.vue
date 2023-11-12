<script setup lang="ts">
import { toRef, computed } from 'vue';
import { useField } from 'vee-validate';
import { modes } from "@/services/validation/interactionModes";

interface Props {
  type?: string,
  value?: string,
  name: string,
  label?: string,
  placeholder?: string,
  mode?: string
}

const props = withDefaults(defineProps<Props>(),{
  type: 'text',
  value: '',
  label: '',
  placeholder: '',
  mode: 'aggressive'
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, 'name');

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
  validateOnValueUpdate: false
});

const handlers = computed(() => {
  const on = {
    blur: handleBlur,
    // default input event to sync the value
    // the `false` here prevents validation
    input: [(e) => handleChange(e, false)],
  };

  // Get list of validation events based on the current mode
  const triggers = modes[props.mode]({
    errorMessage,
    meta,
  });

  // add them to the "on" handlers object
  triggers.forEach((t) => {
    if (Array.isArray(on[t])) {
      on[t].push(handleChange);
    } else {
      on[t] = handleChange;
    }
  });

  return on;
});
</script>

<template>
  <div :class="['rounded-input', errorMessage ? 'rounded-input--error' : '']">
    <div class="rounded-input__input">
      <input
        :id="name"
        :name="name"
        :value="inputValue"
        :type="type"
        :placeholder="placeholder"
        v-on="handlers"
      />
    </div>
    <div v-if="errorMessage" class="rounded-input__invalid-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped></style>