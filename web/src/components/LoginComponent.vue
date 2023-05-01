<template>
  <form class="login-modal">
    <label class="login-lbl"><strong>Login</strong></label>
    <div class="input-group">
      <div class="bubble-input">
        <input v-model="username" placeholder="Username">
      </div>
      <div class="bubble-input">
        <input v-model="password" type="password" placeholder="Password">
      </div>
      <div class="remember-wrapper">
        <div>
          <input type="checkbox" name="rememberUser">
          <label for="rememberUser">Remember me</label>
        </div>
        <a href="https://google.com">Forgot password?</a>
      </div>
    </div>
    <button @click.prevent="handleLogin">
      <strong>Log in</strong>
    </button>
    <div style="margin-top: 20px;">
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
.remember-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  top: -10px;
  position: relative;

  div {
    display: flex;
    align-items: center;
  }
}

.login-modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 340px;
  background-color: white;
  border-radius: 5px;
  box-shadow: #6a6a6a 1px -1px 20px 0px;
}

.input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 70%;
}

button {
  //@extend %animated;

  width: 150px;
  height: 35px;
  font-size: large;
  border: none;
  background-image: linear-gradient(155deg, #ff49fd, #6200ff, #ff0052);
  background-size: 2000% 2000%;
  border-radius: 20px;
  color: white;
  font-family: inherit;
}

.login-lbl {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  font-size: x-large;
  padding: 5px;
  border-radius: 5px;
  width: 80px;
  height: 30px;
}
</style>