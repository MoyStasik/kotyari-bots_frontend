<template>
  <Paragraph
    :class="$style.Paragraph"
    :style="{
      backgroundColor: backgroundColor ? backgroundColor : 'var(--info-message_background-color)',
      color: color ? color : 'var(--subtitile_text-color)',
    }"
  >
    <slot />
  </Paragraph>
</template>

<script setup lang="ts">
import Paragraph from '../Paragraph/Paragraph.vue';
import type { Props } from './StatusPlaceHolder.types';

defineProps<Props>();
</script>

<style module lang="scss">
.Paragraph.Paragraph {
  border-radius: var(--small_border-radius);
  padding: 2px 7px;
  font-size: 11px;
}
</style>
