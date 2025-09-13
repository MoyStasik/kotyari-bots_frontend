<template>
  <div
    :class="$style.Column"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Column.types';

const props = defineProps<Props>();

const columnGap = computed(() => props.gap ? withPX(props.gap) : undefined);
</script>

<style module lang="scss">
.Column.Column {
  display: flex;
  flex-direction: column;
  gap: v-bind(columnGap);
}
</style>
