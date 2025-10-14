<template>
  <div
    :class="$style.Separator"
  >
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Separator.types';

const props = defineProps<Props>();

const size = computed(() => withPX(props.size));
</script>

<style module lang="scss">
.Separator.Separator {
  height: v-bind(size);
  width: 100%;
  background-color: var(--regular_border-background);
}
</style>
