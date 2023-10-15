<template>
  <form class="login-modal">
    <label class="login-modal__label"><strong>Create New User</strong></label>
    <div class="input-group">
      <div class="input--bubble">
        <input v-model="username" placeholder="Username">
      </div>
    </div>
    <button class="button_gradient" @click.prevent="handleCreate">
      <strong>Register</strong>
    </button>
  </form>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import type { Ref } from "vue";

  let username: Ref<String> = ref('');
  let password: Ref<String> = ref('');

  function handleCreate() {

  }
</script>

<style scoped>

</style>