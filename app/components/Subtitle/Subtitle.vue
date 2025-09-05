<template>
  <BaseTypography
    :class="$style.Subtitle"
  >
    <slot></slot>
  </BaseTypography>
</template>

<script setup lang="ts">
import type { Props } from './Subtitle.types';

import BaseTypography from '../BaseTypography/BaseTypography.vue';

defineProps<Props>();
</script>

<style module lang="scss">
.Subtitle.Subtitle {
  font-size: 14px;
  color: var(--subtitile_text-color);
  line-height: 18px;
}
</style>
