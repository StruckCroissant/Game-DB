<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { login } from '@/services/network/authenticationHttp';
import { RouterLink } from "vue-router";
import InputComponent from "@/components/UI/InputComponent.vue";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import { userLoginSchema } from "@/common/schemas";

const loading: Ref<boolean> = ref(false);
const success: Ref<boolean> = ref(false);

const {
  handleSubmit,
  values
} = useForm(
  { validationSchema: toTypedSchema(userLoginSchema) }
);

const onSubmit = handleSubmit(async values => {
  loading.value = true;
  try {
    await login(values.username, values.password);
    success.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <ModalComponent>
    <template #header>
      <label><strong>Login</strong></label>
    </template>
    <template #default>
      <form
        class="form form--centered"
        @submit="onSubmit"
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
          :loading="loading"
          :error="!success"
          type="submit"
        >
          Log in
        </ButtonComponent>
        <div id="account-create">
          Dont have an account? <RouterLink to='/register'>Create</RouterLink>
        </div>
      </form>
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped>
  #account-create {
    display: flex;
  }
</style>