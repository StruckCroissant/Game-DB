<script setup lang="ts"></script>

<template>
  <div class="modal modal--thin">
    <header class="modal__header" data-testid="modal-header">
      <slot name="header"></slot>
    </header>
    <main class="modal__body" data-testid="modal-body">
      <slot></slot>
    </main>
    <footer class="modal__footer" data-testid="modal-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  padding: 1rem;
  position: relative;
  /* These transforms provide a containing block for all children including */
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);

  * {
    width: 100%;
    display: flex;
  }
}

.modal--thin {
  padding: 2rem 3rem;
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
