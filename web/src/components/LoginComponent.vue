<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { useField } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { login } from '@/services/network/authenticationHttp';
import { RouterLink } from "vue-router";
import InputComponent from "@/components/UI/InputComponent.vue";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";

const loading: Ref<boolean> = ref(false);
const success: Ref<boolean> = ref(false);

const requiredFieldSchema = toTypedSchema(
  zod.string().nonempty('Field is required')
);
const {
  value: username, errorMessage: usernameErrorMessage
} = useField('username', requiredFieldSchema);
const {
  value: password, errorMessage: passwordErrorMessage
} = useField('password', requiredFieldSchema);

async function handleLogin(): Promise<void> {
  loading.value = true;
  try {
    await login(username.value, password.value);
    success.value = true;
  } finally {
    loading.value = false;
  }
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
          :invalid-message="usernameErrorMessage"
          v-model="username"
        ></InputComponent>
        <InputComponent
          placeholder="Password"
          type="password"
          :invalid-message="passwordErrorMessage"
          v-model="password"
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
      <ButtonComponent
        @click.prevent="handleLogin"
        :loading="loading"
        :error="!success"
      >
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