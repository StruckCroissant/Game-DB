<script lang="ts" setup>
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useRegister } from "@/services/network/authenticationHttp";
import { userLoginSchema } from "@/common/schemas";
import { toTypedSchema } from "@vee-validate/zod";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import InputComponent from "@/components/UI/InputComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import type { UserLoginRequest } from "@/common/types";
import NavigationModalComponent from "./UI/NavigationModalComponent.vue";

//<editor-fold desc="Form validation">
const { values, handleSubmit } = useForm({
  validationSchema: toTypedSchema(userLoginSchema),
});
//</editor-fold>

//<editor-fold desc="Login">
const registerRequest: UserLoginRequest = reactive({
  username: values.username ?? "",
  password: values.password ?? "",
});

const { push } = useRouter();
const { loading, error, doRegister } = useRegister(registerRequest);

const onSubmit = handleSubmit(async (values) => {
  [registerRequest.username, registerRequest.password] = [
    values.username,
    values.password,
  ];

  await doRegister();
  push({ name: "login" });
});
//</editor-fold>
</script>

<template>
  <NavigationModalComponent>
    <template #header>
      <label><strong>Register</strong></label>
    </template>
    <template #default>
      <form class="form form--centered" @submit="onSubmit">
        <div class="input-group">
          <InputComponent
            placeholder="Username"
            label="Username"
            name="username"
          ></InputComponent>
          <InputComponent
            placeholder="Password"
            label="Password"
            name="password"
            type="password"
          ></InputComponent>
          <ButtonComponent :loading="loading" :error="!!error" type="submit">
            Register
          </ButtonComponent>
        </div>
      </form>
    </template>
    <template #footer> </template>
  </NavigationModalComponent>
</template>

<style scoped></style>
