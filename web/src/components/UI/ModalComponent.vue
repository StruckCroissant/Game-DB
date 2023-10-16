<script setup lang="ts">
// const props = defineProps(defineProps<Props>(), {
//
// });
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  box-shadow: #6a6a6a 1px -1px 20px 0;
  padding: 2rem 3rem;
  //height: 260px;

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