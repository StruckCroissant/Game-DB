<script lang="ts" setup>
import { ref, reactive, computed, watch } from "vue";
import type { Ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from '@vuelidate/validators';
import { login } from '@/services/network/authenticationHttp';
import { RouterLink } from "vue-router";
import InputComponent from "@/components/UI/InputComponent.vue";
import ModalComponent from "@/components/UI/ModalComponent.vue";
import ButtonComponent from "@/components/UI/ButtonComponent.vue";

const loading: Ref<boolean> = ref(false);
const success: Ref<boolean> = ref(false);
const username: Ref<string> = ref('');
const password: Ref<string> = ref('');

const usernameValidationError: Ref<string> = ref('');
const passwordValidationError: Ref<string> = ref('');

watch([username, password], () => {
  console.log(v$.username?.$error);
  usernameValidationError.value =  v$.username?.$error ?
    v$.username.$error[0].$message: null;
  passwordValidationError.value =  v$.password?.$error ?
    v$.password.$error[0].$message: null;
});

const rules = {
  username: {
    required: helpers.withMessage('username is required', required)
  },
  password: {
    required: helpers.withMessage('password is required', required)
  }
};
const state = reactive({
  username: username.value,
  password: password.value
});
const v$ = useVuelidate(rules, state);

async function handleLogin(): Promise<void> {
  loading.value = true;
  v$.value.$validate();
  try {
    await login(username.value, password.value);
    success.value = true;
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
      <div class="input-group">
        <InputComponent
          placeholder="Username"
          @input-changed="(event) => username = event.value"
        ></InputComponent>
        <InputComponent
          placeholder="Password"
          type="password"
          :invalid-message="usernameValidationError"
          @input-changed="(event) => password = event.value"
        ></InputComponent>
        <div class="login-modal__remember">
          <div>
            <input type="checkbox" name="rememberUser">
            <label for="rememberUser">Remember me</label>
          </div>
          <RouterLink to="/forgot">Forgot password?</RouterLink>
        </div>
      </div>
    </template>
    <template #footer>
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
    </template>
  </ModalComponent>
</template>

<style lang="scss" scoped>
  #account-create {
    display: flex;
  }
</style>