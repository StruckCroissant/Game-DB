<script setup lang="ts">
import { ref, TransitionGroup, watch } from "vue";
  import { useToast } from "@/stores/errorStore";
  import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faCircleCheck, faTriangleExclamation, faX } from "@fortawesome/free-solid-svg-icons";
  library.add(faCircleCheck, faTriangleExclamation, faX);

  type ToastIcons = 'x' | 'triangle-exclamation' | 'circle-check';

  const toastStore = useToast();
  const wrapperInDom = ref<boolean>(false);
  watch(toastStore.toasts, (value, oldValue) => {
    setTimeout(() => {
      wrapperInDom.value = !!toastStore.toasts.length;
    }, 200);
  });
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      tag="ul"
      name="list"
      v-if="wrapperInDom"
      class="toast__wrapper"
    >
      <li
        v-for="(toast, idx) in toastStore.toasts"
        class="toast__list-item"
        :key="toast.id"
      >
        <span class="toast__list-text">
          {{ toast.text }}
        </span>
        <FontAwesomeIcon class="toast__list-icon" :icon="'x'"/>
      </li>
    </TransitionGroup>
  </Teleport>
</template>

<style lang="scss" scoped>
  .list-enter-active,
  .list-leave-active,
  .list-move {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .list-leave-active {
    position: absolute;
  }

  .toast__wrapper {
    display: flex;
    gap: 1rem;
    flex-direction: column-reverse;
    justify-content: flex-start;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1rem;
    width: 300px;
    height: fit-content;
  }

  .toast__list-item {
    list-style-type: none;
    background: #ff6161;
    padding: 1rem;
    border-radius: 5px;
    width: fit-content;
    margin-right: auto;
  }
</style>