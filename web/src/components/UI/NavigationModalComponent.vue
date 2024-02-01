<script lang="ts" setup>
import { useRouter } from "vue-router";
import ModalComponent from "./ModalComponent.vue";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

const { push } = useRouter();
</script>

<template>
  <ModalComponent>
    <template #header>
      <a
        id="back-button"
        alt="Go back"
        aria-role="link"
        @click="push({ name: 'login' })"
      >
        <FontAwesomeIcon :icon="faArrowLeftLong" />
      </a>
      <slot name="header"></slot>
    </template>
    <template #default><slot name="default"></slot></template>
    <template #footer><slot name="footer"></slot></template>
  </ModalComponent>
</template>

<style lang="scss" scoped>
@import "@/styles/abstracts/variables";

#back-button {
  position: fixed;
  top: 5px;
  left: 5px;
  cursor: pointer;
  color: $grey;
}
</style>
