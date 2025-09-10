<template>
  <BaseTypography
    :class="$style.Paragraph"
  >
    <slot></slot>
  </BaseTypography>
</template>

<script setup lang="ts">
import type { Props } from './Paragraph.types';

defineProps<Props>();
</script>

<style module lang="scss">
.Paragraph.Paragraph {
  font-size: 13px;
  line-height: 18px;
}
</style>
