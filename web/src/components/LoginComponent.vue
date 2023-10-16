<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { login } from '@/services/authenticationHttp';
import InputComponent from "@/components/UI/InputComponent.vue";
import ModalComponent from "@/components/UI/ModalComponent.vue";

let username: Ref<string> = ref('');
let password: Ref<string> = ref('');

function handleLogin(): void {
  login(username.value, password.value);
}

function updateUsername({value}: {value: string}) {
  username.value = value;
}

function updatePassword({value}: {value: string}) {
  password.value = value;
}
</script>

<template>
  <ModalComponent>
    <template #header>
      <label><strong>Login</strong></label>
    </template>
    <template #default>
      <div class="input-group">
        <InputComponent
          default-placeholder="Username"
          @input-changed="(event) => username = event.value"
        ></InputComponent>
        <InputComponent
          type="password"
          default-placeholder="Password"
          @input-changed="(event) => password = event.value"
        ></InputComponent>
        <div class="login-modal__remember">
          <div>
            <input type="checkbox" name="rememberUser">
            <label for="rememberUser">Remember me</label>
          </div>
          <RouterLink to="/forgot">Forgot password?</RouterLink>
        </div>
      </div>
    </template>
    <template #footer>
      <button class="gradient-button" @click.prevent="handleLogin">
        <strong>Log in</strong>
      </button>
      <div id="account-create">
        Dont have an account? <RouterLink to='/register'>Create</RouterLink>
      </div>
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped>
  #account-create {
    display: flex;
  }
</style>