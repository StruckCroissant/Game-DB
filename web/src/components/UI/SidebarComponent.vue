<script lang="ts" setup>
import { usePersistentState } from "@/composables/usePersistentState";
import {
  faAnglesRight,
  faAnglesLeft,
  faGear,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";

const documentTitle = computed(() => document.title);
const buttonIcon = computed(() =>
  sidebarOpen.value ? faAnglesLeft : faAnglesRight
);

const { persistentValue: sidebarOpen } = usePersistentState<boolean>(
  "state/binary/sidebar-open",
  true
);
</script>

<template>
  <TransitionGroup name="slide">
    <div class="sidebar" v-if="sidebarOpen" key="sidebar-content">
      <header class="sidebar__header">
        <span>{{ documentTitle }}</span>
        <button class="button button--grey" @click="sidebarOpen = false">
          <FontAwesomeIcon :icon="buttonIcon" />
        </button>
      </header>
      <nav class="sidebar__item-container">
        <div class="sidebar__item">
          lorem ipsum <FontAwesomeIcon :icon="faAnglesRight" />
        </div>
        <div class="sidebar__item">
          lorem ipsum <FontAwesomeIcon :icon="faAnglesRight" />
        </div>
        <div class="sidebar__item">
          lorem ipsum <FontAwesomeIcon :icon="faAnglesRight" />
        </div>
        <div class="sidebar__item">
          lorem ipsum <FontAwesomeIcon :icon="faAnglesRight" />
        </div>
      </nav>
      <footer class="sidebar__footer">
        <RouterLink to="logout">
          <FontAwesomeIcon :icon="faRightFromBracket" />
        </RouterLink>
        <FontAwesomeIcon :icon="faGear" />
      </footer>
    </div>
    <div class="sidebar-tab" v-if="!sidebarOpen" key="sidebar-tab">
      <button
        class="button button--left-attach sidebar__collapse-button"
        @click="sidebarOpen = true"
      >
        <FontAwesomeIcon :icon="buttonIcon" />
      </button>
    </div>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
@import "@/styles/abstracts/variables";
@import "@/styles/abstracts/mixins";
@import "@/styles/abstracts/placeholders";

$sidebar-height: 60px;
%transition-speed {
  transition: all 0.3s ease;
}

.slide-enter-active,
.slide-leave-active {
  transform: translateX(-100%);
  position: absolute;
}

.nav-item {
  background-color: green;
  border: 1px solid black;
  font-weight: bold;
  font-size: large;
  display: flex;
  text-align: center;
  text-justify: auto;
  border-radius: 5px;
  padding: 0.35rem 0.75rem;
  margin-bottom: 0.5rem;
}

.sidebar {
  @extend %transition-speed;
  @include box-shadow($grey--light);
  position: sticky;
  top: 0;
  width: 220px;
  height: 100vh;
  border-radius: 0 10px 10px 0;
  background-color: white;
  overflow: hidden;
  flex-direction: column;
  border-right: 1px solid $grey--light;
  display: flex;

  &__header {
    height: $sidebar-height;
    background-color: white;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
    padding: 0.5rem;
    font-size: large;
    font-weight: bold;
    border-bottom: 1px solid $grey--light;
  }

  &__footer {
    @extend %float-down;
    display: flex;
    align-items: center;
    border-top: 1px solid $grey--light;
    padding: 0.5rem 0.75rem;
    justify-content: space-between;

    > svg {
      height: 20px;
    }
  }

  &__header svg,
  &__footer svg {
    color: $grey;
  }

  &__item-container {
    padding: 0.75rem;
  }

  &__item {
    background-color: green;
    border: 1px solid black;
    font-weight: bold;
    font-size: large;
    display: flex;
    text-align: center;
    text-justify: auto;
    border-radius: 5px;
    padding: 0.35rem 0.75rem;
    margin-bottom: 0.5rem;

    > i,
    > svg {
      @extend %float-right;
    }
  }
}

.sidebar-tab {
  @extend %transition-speed;
  position: absolute;
  margin-top: 10px;
}
</style>
