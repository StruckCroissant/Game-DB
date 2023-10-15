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
          @input-changed="updateUsername"
        ></InputComponent>
        <InputComponent
          default-placeholder="Password"
          @input-changed="updatePassword"></InputComponent>
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
      <div class="login-modal__footer">
        <button class="button_gradient" @click.prevent="handleLogin">
          <strong>Log in</strong>
        </button>
        <div>
          Dont have an account? <RouterLink to='/register'>Create</RouterLink>
        </div>
      </div>
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped>
  #account-create {
    margin-top: 20px;
  }
</style>