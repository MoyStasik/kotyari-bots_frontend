<template>
  <div
    :class="$style.PageWrapper"
  >
    <Bots />
  </div>
</template>

<script setup lang="ts">
import Bots from '~/modules/Bots/Bots.vue';

</script>

<style module lang="scss">
.PageWrapper.PageWrapper {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>
