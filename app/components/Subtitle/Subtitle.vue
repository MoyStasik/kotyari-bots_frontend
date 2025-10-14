<template>
  <BaseTypography
    :class="$style.Subtitle"
  >
    <slot/>
  </BaseTypography>
</template>

<script setup lang="ts">
import BaseTypography from '../BaseTypography/BaseTypography.vue';
</script>

<style module lang="scss">
.Subtitle.Subtitle {
  font-size: 14px;
  color: var(--subtitile_text-color);
  line-height: 18px;
}
</style>
