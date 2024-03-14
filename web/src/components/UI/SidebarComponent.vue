<script lang="ts" setup>
import { faAnglesRight, faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref, computed, TransitionGroup } from "vue";

const collapsed = ref(false);
function toggleCollapsed() {
  collapsed.value = !collapsed.value;
}

const buttonIcon = computed(() =>
  collapsed.value ? faAnglesRight : faAnglesLeft
);
</script>

<template>
  <TransitionGroup name="slide" appear>
    <div class="sidebar" v-if="!collapsed">
      <div class="sidebar__header">
        <button
          class="button sidebar__collapse-button"
          @click="toggleCollapsed"
        >
          <FontAwesomeIcon :icon="buttonIcon" />
        </button>
      </div>
    </div>
    <div class="sidebar-tab" v-if="collapsed">
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

.slide-enter-active {
  transform: translateX(-100%);
}

.slide-leave-active {
  transform: translateX(-100%);
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.sidebar {
  position: sticky;
  top: 0;
  width: 220px;
  height: 100vh;
  border-radius: 0 10px 10px 0;
  background-color: red;
  overflow: hidden;
  flex-direction: column;
  transition: ease all 0.5s;

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
    // order: 2;
    justify-self: flex-end;
  }
}

.sidebar-tab {
  position: absolute;
  margin-top: calc(10px);
  transition: ease all 0.5s;
}
</style>
