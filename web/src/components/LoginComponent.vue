<script lang="ts" setup>
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useLogin } from "@/services/network/authenticationHttp";
import { RouterLink, useRouter } from "vue-router";
import InputComponent from "@/components/UI/InputComponent.vue";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import { userLoginSchema } from "@/common/schemas";
import type { UserLoginRequest } from "@/common/types";

//<editor-fold desc="Routing">
const { push } = useRouter();
//</editor-fold>

//<editor-fold desc="Form Context">
const { handleSubmit, values } = useForm({
  validationSchema: toTypedSchema(userLoginSchema),
});

let loginRequest: UserLoginRequest = reactive({
  username: values.username ?? "",
  password: values.password ?? "",
});

const { doLogin, error, loading } = useLogin(loginRequest);

const onSubmit = handleSubmit(async (values) => {
  loginRequest.username = values.username;
  loginRequest.password = values.password;
  await doLogin();
  await push({ name: "home" });
});
//</editor-fold>
</script>

<template>
  <ModalComponent>
    <template #header>
      <label><strong>Login</strong></label>
    </template>
    <template #default>
      <form class="form form--centered" @submit="onSubmit">
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
          <div class="login-modal__under-buttons">
            <RouterLink to="/register">Forgot password?</RouterLink>
          </div>
        </div>
        <ButtonComponent :loading="loading" :error="!!error" type="submit">
          Log in
        </ButtonComponent>
        <div class="d-flex">
          Dont have an account? <RouterLink to="/register">Create</RouterLink>
        </div>
      </form>
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped></style>
