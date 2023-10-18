<script setup lang="ts">
import { provide, ref } from "vue";
import { RouterView } from 'vue-router';
import AlertComponent from "@/components/UI/AlertComponent.vue";

const alertComponentRef = ref<AlertComponent>(null);
if(alertComponentRef.value) {
  provide('Alert', {showAlert: alertComponentRef.value.showAlert});
}
</script>

<template>
  <AlertComponent ref="alertComponentRef"></AlertComponent>
  <RouterView />
</template>

<style scoped>
</style>
