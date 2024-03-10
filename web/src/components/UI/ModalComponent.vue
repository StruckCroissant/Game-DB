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
  /* These transforms provide a containing block for all children */
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);

  * {
    width: 100%;
    display: flex;
  }

  &--thin {
    padding: 2rem 3rem;
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.5rem;
    padding: 5px;

    &--title {
      font-size: x-large;
    }
  }

  &__body {
    justify-content: center;
    margin: 10px;
  }

  &__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
    flex-direction: column;
  }
}
</style>
