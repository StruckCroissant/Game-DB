<script lang="ts" setup>
import { RouterView } from "vue-router";
import ToastComponent from "@/components/UI/ToastComponent.vue";
</script>

<template>
  <ToastComponent />
  <RouterView />
</template>

<style>
* {
  font-family: Lato, system-ui;
  box-sizing: border-box;
}
</style>
