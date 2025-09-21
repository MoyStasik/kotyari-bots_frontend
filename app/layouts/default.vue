<template>
  <div
    :class="$style.layout"
  >
    <Header
      :header-wrapper-styles="{ ...contentWidth }"
    />
    <main
      :class="$style.Main"
    >
      <div
        :class="$style.PageWrapper"
        :style="{
          ...contentWidth,
          maxWidth: isDesktop ? '1160px' : (isTablet ? '728px' : 'calc(100vw - 40px)'),
        }"
      >
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/modules/Header/Header.vue';

const { isDesktop, isTablet } = useAdaptivity();

const contentWidth = computed(() => {
  if (isDesktop.value) {
    return {
      minWidth: '1160px',
    };
  }

  if (isTablet.value) {
    return {
      minWidth: '728px',
    };
  }

  if (!isTablet.value) {
    return {
      minWidth: 'calc(100vw - 40px)',
    };
  }

  return {
    minWidth: '',
  };
});
</script>

<style  module lang="scss">
.layout.layout {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.Main.Main {
  display: flex;
  justify-content: center;
}

.PageWrapper.PageWrapper {
  padding: 20px 15px;
}
</style>
