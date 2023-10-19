<script setup lang="ts">
  import { useToast } from "@/stores/errorStore";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faCircleCheck, faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
  library.add(faCircleCheck, faTriangleExclamation, faX);

  type ToastIcons = 'x' | 'triangle-exclamation' | 'circle-check';

  const toastStore = useToast();
</script>

<template>
  <Teleport to="body">
    <ul v-if="toastStore.toasts.length" class="toast__wrapper">
      <li
        v-for="toast in toastStore.toasts"
        class="toast__list-item"
        :key="toast.text"
      >
        <span class="toast__list-text">
          {{ toast.text }}
        </span>
        <FontAwesomeIcon class="toast__list-icon" :icon="'x'"/>
      </li>
    </ul>
  </Teleport>
</template>

<style lang="scss" scoped>
  .toast__wrapper {
    position: fixed;
    top: 95%;
    right: 2%;
  }

  .toast__list-item {
    list-style-type: none;
    background: red;
    padding: 1rem;
  }
</style>