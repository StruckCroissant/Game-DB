<template>
  <form class="login-modal">
    <label class="login-modal__label"><strong>Register</strong></label>
    <div class="input-group">
      <div class="input--bubble">
        <input v-model="username" placeholder="Username">
      </div>
      <div class="input--bubble">
        <input v-model="password" type="password" placeholder="Password">
      </div>
    </div>
    <button class="button_gradient" @click.prevent="handleRegister">
      <strong>Register</strong>
    </button>
  </form>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import type {Ref} from "vue";
  import {register} from "@/services/authenticationHttp";

  const username: Ref<string> = ref('');
  const password: Ref<string> = ref('');

  function handleRegister(): void {
    register(username.value, password.value);
  }
</script>

<style scoped>

</style>