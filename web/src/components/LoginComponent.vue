<template>
  <form class="login-modal">
    <label class="login-modal__label"><strong>Login</strong></label>
    <div class="input-group">
      <div class="bubble-input">
        <input v-model="username" placeholder="Username">
      </div>
      <div class="bubble-input">
        <input v-model="password" type="password" placeholder="Password">
      </div>
      <div class="login-modal__remember">
        <div>
          <input type="checkbox" name="rememberUser">
          <label for="rememberUser">Remember me</label>
        </div>
        <a href="https://google.com">Forgot password?</a>
      </div>
    </div>
    <button class="button_gradient" @click.prevent="handleLogin">
      <strong>Log in</strong>
    </button>
    <div>
      Dont have an account? <router-link to='/register'>Create</router-link>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { login } from '@/services/authenticationHttp';

let username: Ref<string> = ref('');
let password: Ref<string> = ref('');

function handleLogin(): void {
  login(username.value, password.value);
}
</script>

<style lang="scss" scoped>
  #account-create {
    margin-top: 20px;
  }
</style>