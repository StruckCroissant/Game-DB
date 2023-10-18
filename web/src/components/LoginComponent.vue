<script lang="ts" setup>
import { ref, inject } from "vue";
import type { Ref } from "vue";
import { login } from '@/services/network/authenticationHttp';
import InputComponent from "@/components/UI/InputComponent.vue";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import AlertComponent from "@/components/UI/AlertComponent.vue";

const Alert = inject<typeof AlertComponent>('Alert');

let loading: Ref<boolean> = ref(false);
let username: Ref<string> = ref('');
let password: Ref<string> = ref('');

async function handleLogin(): Promise<void> {
  loading.value = true;
  try {
    await login(username.value, password.value);
  } catch (error) {
    Alert.showAlert(error);
  }
  loading.value = false;
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
          placeholder="Username"
          @input-changed="(event) => username = event.value"
        ></InputComponent>
        <InputComponent
          type="password"
          placeholder="Password"
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
      <ButtonComponent @click.prevent="handleLogin" :loading="loading">
        Log in
      </ButtonComponent>
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