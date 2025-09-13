<template>
  <component
    :is="tag"
    :class="$style.BaseTypography"
  >
    <slot/>
  </component>
</template>

<script setup lang="ts">
import type { Props } from './BaseTypography.types';

withDefaults(defineProps<Props>(), {
  tag: 'span',
});

</script>

<style module lang="scss">
.BaseTypography.BaseTypography {
  font-family: var(--base_ui-sans-typography);
  color: var(--black_text-color)
}
</style>
