<script setup lang="ts">
import { TransitionGroup } from "vue";
import { useToast } from "@/stores/errorStore";
import type { ToastStatus } from "@/stores/errorStore";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faCircleCheck, faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
import { storeToRefs } from "pinia";
  library.add(faCircleCheck, faTriangleExclamation, faX);

  type ToastIcon = 'x' | 'triangle-exclamation' | 'circle-check';
  type ToastClass = 'success' | 'warning' | 'error';
  const toastIconMap: Record<ToastStatus, ToastIcon> = {
    success: 'circle-check',
    warning: 'triangle-exclamation',
    error: 'x'
  };
  const toastClassMap: Record<ToastStatus, ToastClass> = {
    success: 'success',
    warning: 'warning',
    error: 'error'
  };

  const toastStore = useToast();
  const { toasts } = storeToRefs(toastStore);
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      tag="ul"
      name="slide-list"
      v-if="toasts.length"
      class="toast__wrapper"
      appear
    >
      <li
        v-for="toast in toasts"
        :class="['toast__list-item', toastClassMap[toast.status]]"
        :key="toast.id"
      >
        <FontAwesomeIcon class="toast__list-icon" :icon="toastIconMap[toast.status]"/>
        <span class="toast__list-text">
          {{ toast.text }}
        </span>
        <button @click="toastStore.remove(toast.id)">x</button>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<style lang="scss" scoped>
  .toast__wrapper {
    position: fixed;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column-reverse;
    justify-content: flex-start;
    min-width: max-content;
    height: fit-content;
    margin: 1rem;
    gap: 1rem;
  }

  .toast__list-item {
    min-width: max-content;
    margin-right: auto;
    padding: 1.5rem;
    list-style-type: none;
    border-radius: 5px;
    background: white;
    box-shadow: #6a6a6a 1px -1px 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;

    * {
      margin: 0;
    }
  }
</style>