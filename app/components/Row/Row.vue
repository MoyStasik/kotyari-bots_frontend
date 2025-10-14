<template>
  <div
    :class="$style.Row"
    :style="styles"
  >
    <slot/>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Row.types';

const props = defineProps<Props>();

const rowGap = computed(() => props.gap ? withPX(props.gap) : undefined);

const styles = computed(() => props.itemsCenter ? { alignItems: 'center'} : {});
</script>

<style module lang="scss">
.Row.Row {
  display: flex;
  gap: v-bind(rowGap);
}
</style>
