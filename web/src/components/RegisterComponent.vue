<script lang="ts" setup>
import {register} from "@/services/network/authenticationHttp";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import InputComponent from "@/components/UI/InputComponent.vue";
import { useForm } from "vee-validate";
import { userLoginSchema } from "@/common/schemas";
import { toTypedSchema } from "@vee-validate/zod";

const {
  values
} = useForm(
  { validationSchema: toTypedSchema(userLoginSchema) }
);

function onSubmit() {

}
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
          ></InputComponent>
        <button class="gradient-button" type="submit">
          <strong>Register</strong>
        </button>
        </div>
      </form>
    </template>
    <template #footer>
    </template>
  </ModalComponent>
</template>

<style scoped>
</style>