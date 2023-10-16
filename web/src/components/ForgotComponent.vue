<template>
  <ModalComponent>
    <template #header>
      <label><strong>Create New User</strong></label>
    </template>
    <template #default>
      <div class="input-group">
        <div class="bubble-input">
          <input v-model="username" placeholder="Username">
        </div>
      </div>
    </template>
    <template #footer>
      <button class="gradient-button" @click.prevent="handleCreate">
        <strong>Register</strong>
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import type { Ref } from "vue";
  import ModalComponent from "@/components/UI/ModalComponent.vue";

  let username: Ref<String> = ref('');
  let password: Ref<String> = ref('');

  function handleCreate() {

  }
</script>

<style scoped>

</style>