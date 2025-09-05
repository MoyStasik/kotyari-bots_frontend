<template>
  <div
    :class="$style.layout"
  >
    <Header />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Header from '~/modules/Header/Header.vue';

</script>

<style  module lang="scss">
.layout.layout {
  display: flex;
  width: 100%;
}
</style>
