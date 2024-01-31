<script lang="ts" setup>
import { useRouter } from "vue-router";
import ModalComponent from "./ModalComponent.vue";

const { go } = useRouter();
</script>

<template>
  <ModalComponent>
    <template #header>
      <div></div>
    </template>
    <template><slot></slot></template>
    <template><slot name="footer"></slot></template>
  </ModalComponent>
</template>

<style lang="scss"></style>
