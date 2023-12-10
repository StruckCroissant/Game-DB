<script setup lang="ts">
import { TransitionGroup, ref, watch } from "vue";
import { useToast } from "@/stores/toastStore";
import type { ToastStatus } from "@/stores/toastStore";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleCheck,
  faTriangleExclamation,
  faX,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { storeToRefs } from "pinia";
library.add(faCircleCheck, faTriangleExclamation, faX, faCircleExclamation);

type ToastIcon = "triangle-exclamation" | "fa-circle-exclamation" | "circle-check";
type ToastClass = "icon--success" | "icon--warning" | "icon--error";
const toastIconMap: Record<ToastStatus, ToastIcon> = {
  success: "circle-check",
  warning: "triangle-exclamation",
  error: "fa-circle-exclamation",
};
const toastClassMap: Record<ToastStatus, ToastClass> = {
  success: "icon--success",
  warning: "icon--warning",
  error: "icon--error",
};

const toastStore = useToast();
const { toasts } = storeToRefs(toastStore);
const wrapperInDom = ref(false);

watch(() => toasts.value.length, (value) => {
  if (value) {
    wrapperInDom.value = true;
    return;
  }

  setTimeout(() => {
    wrapperInDom.value = false;
  }, 300);
});
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      tag="ul"
      name="slide-list"
      v-if="!!wrapperInDom"
      class="toast__wrapper"
      appear
    >
      <li
        v-for="toast in toasts"
        :class="['toast__list-item']"
        :key="toast.id"
      >
        <FontAwesomeIcon
          :class="['icon--large', toastClassMap[toast.status]]"
          :icon="toastIconMap[toast.status]"
        />
        <span class="toast__list-text">
          {{ toast.text }}
        </span>
        <button id="close-button" @click="toastStore.remove(toast.id)">x</button>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<style lang="scss" scoped>
@import "@/styles/abstracts/mixins";

#close-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 5px;
  background: none;
  border: none;
  cursor: pointer;
}

.toast__wrapper {
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  min-width: max-content;
  margin: 1rem;
  gap: 1rem;
}

.toast__list-item {
  @include box-shadow(#6a6a6a);
  position: relative;
  max-width: 300px;
  margin-right: auto;
  padding: 1.5rem;
  list-style-type: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 2px;
  background-color: white;

  * {
    margin: 0;
  }
}
</style>