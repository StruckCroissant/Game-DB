<template>
  <ModalComponent>
    <template #header>
      <label><strong>Register</strong></label>
    </template>
    <template #default>
      <div class="input-group">
        <div class="bubble-input">
          <input v-model="username" placeholder="Username">
        </div>
        <div class="bubble-input">
          <input v-model="password" type="password" placeholder="Password">
        </div>
      </div>
    </template>
    <template #footer>
      <button class="gradient-button" @click.prevent="register(username, password)">
        <strong>Register</strong>
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import type {Ref} from "vue";
  import {register} from "@/services/authenticationHttp";
  import ModalComponent from "@/components/UI/ModalComponent.vue";

  const username: Ref<string> = ref('');
  const password: Ref<string> = ref('');
</script>

<style scoped>

</style>