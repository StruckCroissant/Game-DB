<template>
  <ModalComponent>
    <template #header>
      <label><strong>Register</strong></label>
    </template>
    <template #default>
      <div class="input-group">
        <InputComponent
          placeholder="Username"
          @input-changed="(event) => username = event.value"
        ></InputComponent>
        <InputComponent
          placeholder="Password"
          @input-changed="(event) => password = event.value"
        ></InputComponent>
      </div>
    </template>
    <template #footer>
      <button class="gradient-button" @click.prevent="register(username, password)">
        <strong>Register</strong>
      </button>
    </template>
  </ModalComponent>
</template>

<script lang="ts" setup>
  import {ref} from "vue";
  import type {Ref} from "vue";
  import {register} from "@/services/network/authenticationHttp";
  import ModalComponent from "@/components/UI/ModalComponent.vue";
  import InputComponent from "@/components/UI/InputComponent.vue";

  const username: Ref<string> = ref('');
  const password: Ref<string> = ref('');
</script>

<style scoped>

</style>