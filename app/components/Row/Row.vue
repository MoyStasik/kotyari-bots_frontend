<template>
  <div
    :class="$style.Row"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Row.types';

const props = defineProps<Props>();

const rowGap = computed(() => props.gap ? withPX(props.gap) : undefined);
</script>

<style module lang="scss">
.Row.Row {
  display: flex;
  gap: v-bind(rowGap);
}
</style>
