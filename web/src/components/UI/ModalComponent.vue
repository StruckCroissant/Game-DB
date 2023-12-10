<script setup lang="ts">
</script>

<template>
  <div class="modal">
    <header class="modal__header">
      <slot name="header"></slot>
    </header>
    <main class="modal__body">
      <slot></slot>
    </main>
    <footer class="modal__footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.modal {
  @include box-shadow(#6a6a6a);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 2rem 3rem;

  * {
    width: 100%;
    display: flex;
  }
}

.modal__header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: x-large;
  padding: 5px;
  border-radius: 5px;
}

.modal__body {
  justify-content: center;
  margin: 10px;
}

.modal__footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  flex-direction: column;
}
</style>