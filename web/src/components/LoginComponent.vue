<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { TypedSchema, Form } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as zod from 'zod';
import { login } from '@/services/network/authenticationHttp';
import { RouterLink } from "vue-router";
import InputComponent from "@/components/UI/InputComponent.vue";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";

const loading: Ref<boolean> = ref(false);
const success: Ref<boolean> = ref(false);
const username: Ref<string> = ref('');
const password: Ref<string> = ref('');

const requiredFieldSchema = (fieldName: string): TypedSchema<string, string> => toTypedSchema(
  zod.string().nonempty(`${fieldName} is required`)
);
const formValidationSchema = {
  username: requiredFieldSchema('username'),
  password: requiredFieldSchema('password'),
}

async function handleLogin(): Promise<void> {
  loading.value = true;
  try {
    await login(username.value, password.value);
    success.value = true;
  } catch (error) {
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
      <Form
        class="form form--centered"
        :validation-schema="formValidationSchema"
      >
        <div class="input-group">
          <InputComponent
            placeholder="Username"
            name="username"
            type="text"
            label="Username"
          ></InputComponent>
          <InputComponent
            placeholder="Password"
            name="password"
            type="password"
            label="Password"
          ></InputComponent>
          <div class="login-modal__remember">
            <div>
              <input type="checkbox" name="rememberUser">
              <label for="rememberUser">Remember me</label>
            </div>
            <RouterLink to="/register">Forgot password?</RouterLink>
          </div>
        </div>
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
      </Form>
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped>
  #account-create {
    display: flex;
  }
</style>