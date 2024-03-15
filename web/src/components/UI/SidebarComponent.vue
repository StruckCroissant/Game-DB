<script lang="ts" setup>
import { usePersistentState } from "@/composables/usePersistentState";
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";

const buttonIcon = computed(() =>
  sidebarOpen.value ? faAnglesLeft : faAnglesRight
);

function toggleCollapsed() {
  update(`${!JSON.parse(persistentValue.value as string)}`);
}

const { persistentValue, update } = usePersistentState(
  "state/binary/sidebar-open",
  "true"
);

const sidebarOpen = computed(() => persistentValue.value === "true");
</script>

<template>
  <TransitionGroup name="slide">
    <div class="sidebar" v-if="sidebarOpen" :key="'sidebar-content'">
      <div class="sidebar__header">
        <button
          class="button sidebar__collapse-button"
          @click="toggleCollapsed"
        >
          <FontAwesomeIcon :icon="buttonIcon" />
        </button>
      </div>
    </div>
    <div class="sidebar-tab" v-if="!sidebarOpen" :key="'sidebar-tab'">
      <button
        class="button button--left-attach sidebar__collapse-button"
        @click="toggleCollapsed"
      >
        <FontAwesomeIcon :icon="buttonIcon" />
      </button>
    </div>
  </TransitionGroup>
</template>

<style lang="scss" scoped>
$sidebar-height: 60px;
%transition-speed {
  transition: all 0.3s ease;
}

.slide-enter-active,
.slide-leave-active {
  transform: translateX(-100%);
  position: absolute;
}

.sidebar {
  @extend %transition-speed;
  position: sticky;
  top: 0;
  width: 220px;
  height: 100vh;
  border-radius: 0 10px 10px 0;
  background-color: red;
  overflow: hidden;
  flex-direction: column;

  &__header {
    height: $sidebar-height;
    background-color: green;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    display: flex;
  }

  &__collapse-button {
    margin-left: auto;
    margin-right: 0.3rem;
    justify-self: flex-end;
  }

  &__item {
  }
}

.sidebar-tab {
  @extend %transition-speed;
  position: absolute;
  margin-top: 10px;
}
</style>
