<template>
  <div
    :class="$style.layout"
  >
    <Header
      :header-wrapper-styles="{ ...contentWidth }"
    />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Header from '~/modules/Header/Header.vue';

const { isDesktop, isTablet } = useAdaptivity();

const contentWidth = computed(() => {
  if (isDesktop.value) {
    return {
      minWidth: '1160px',
    }
  }

  if (isTablet.value) {
    return {
      minWidth: '728px',
    };
  }

  if (!isTablet.value) {
    return {
      minWidth: 'calc(100vw - 40px)',
    }
  }
})
</script>

<style  module lang="scss">
.layout.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
