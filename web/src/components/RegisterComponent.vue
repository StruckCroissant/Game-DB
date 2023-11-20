<script lang="ts" setup>
import { useRegister } from "@/services/network/authenticationHttp";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import InputComponent from "@/components/UI/InputComponent.vue";
import { useForm } from "vee-validate";
import { userLoginSchema } from "@/common/schemas";
import { toTypedSchema } from "@vee-validate/zod";
import { reactive } from "vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";

const {
  values,
  handleSubmit,
} = useForm({ validationSchema: toTypedSchema(userLoginSchema) });

const registerRequest: AuthRequest = reactive({
  username: values.username,
  password: values.password
});

const {
  loading,
  error,
  doRegister,
} = useRegister(registerRequest);

const onSubmit = handleSubmit(async values => {
  registerRequest.username = values.username;
  registerRequest.password = values.password;
  await doRegister();
});
</script>

<template>
  <ModalComponent>
    <template #header>
      <label><strong>Register</strong></label>
    </template>
    <template #default>
      <form
        class="form form--centered"
        @submit="onSubmit"
      >
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
        <ButtonComponent
          :loading="loading"
          :error="!!error"
          type="submit"
        >
          Register
        </ButtonComponent>
        </div>
      </form>
    </template>
    <template #footer>
    </template>
  </ModalComponent>
</template>

<style scoped>
</style>