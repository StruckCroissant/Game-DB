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

<style lang="scss" scoped></style>
