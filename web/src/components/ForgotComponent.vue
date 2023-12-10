<template>
  <ModalComponent>
    <template #header>
      <label><strong>Create New User</strong></label>
    </template>
    <template #default>
      <div class="input-group">
        <InputComponent
          placeholder="Username"
          :invalid-message="usernameErrorMessage"
          v-model="username"
        >
        </InputComponent>
      </div>
    </template>
    <template #footer>
      <button class="gradient-button" @click.prevent="handleCreate">
        <strong>Register</strong>
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
import { useField, TypedSchema } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as zod from "zod";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import InputComponent from "@/components/UI/InputComponent.vue";

const requiredFieldSchema = (fieldName: string): TypedSchema<string, string> =>
  toTypedSchema(zod.string().nonempty(`${fieldName} is required`));
const { value: username, errorMessage: usernameErrorMessage } = useField(
  "username",
  requiredFieldSchema("username")
);
const { value: password, errorMessage: passwordErrorMessage } = useField(
  "password",
  requiredFieldSchema("password")
);

function handleCreate() {}
</script>

<style scoped></style>
