<script lang="ts" setup>
import { reactive } from "vue";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import { useRegister } from "@/services/network/authenticationHttp";
import { userLoginSchema } from "@/types/schemas";
import { toTypedSchema } from "@vee-validate/zod";
import InputComponent from "@/components/UI/InputComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";
import NavigationModalComponent from "./UI/NavigationModalComponent.vue";
import type { UserLoginRequest } from "@/types";

//#region Form validation
const { values, handleSubmit } = useForm({
  validationSchema: toTypedSchema(userLoginSchema),
});
//#endregion

//#region Login
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
//#endregion
</script>

<template>
  <NavigationModalComponent>
    <template #header>
      <label><strong>Register</strong></label>
    </template>
    <template #default>
      <form class="form form--centered" @submit="onSubmit">
        <div class="input-group">
          <InputComponent label="Username" name="username"></InputComponent>
          <InputComponent
            label="Password"
            name="password"
            type="password"
          ></InputComponent>
          <ButtonComponent
            :loading="loading"
            :error="!!error"
            label="Register"
            type="submit"
          >
            Register
          </ButtonComponent>
        </div>
      </form>
    </template>
    <template #footer> </template>
  </NavigationModalComponent>
</template>

<style scoped></style>
