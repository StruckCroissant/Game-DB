<template>
  <section class="wrapper">
    <router-view/>
  </section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
@import '@/styles/abstracts/_placeholders.scss';

a {
  margin-bottom: 0;
  text-decoration: 0;
  color: black;
}

.wrapper {
  @extend %animated;
  background-image: linear-gradient(155deg, #ff49fd, #6200ff, #ff0052);
  //font-family: Lato, system-ui;
  font-size: 14px;
  background-size: 400% 400%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

</style>