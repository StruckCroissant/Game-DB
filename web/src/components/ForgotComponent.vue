<template>
  <ModalComponent>
    <template #header>
      <label><strong>Create New User</strong></label>
    </template>
    <template #default>
      <div class="input-group">
        <InputComponent
          name="username"
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
import { useField } from "vee-validate";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import InputComponent from "@/components/UI/InputComponent.vue";
import { requiredFieldSchema } from "@/common/schemas";

const { value: username, errorMessage: usernameErrorMessage } = useField(
  "username",
  requiredFieldSchema("username")
);
// TODO remove this line once the feature is completed
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { value: password, errorMessage: passwordErrorMessage } = useField(
  "password",
  requiredFieldSchema("password")
);

function handleCreate() {}
</script>

<style scoped></style>
