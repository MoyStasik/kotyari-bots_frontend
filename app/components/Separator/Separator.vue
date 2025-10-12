<template>
  <div
    :class="$style.Separator"
  >
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Separator.types';

const props = defineProps<Props>();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const size = computed(() => withPX(props.size));
</script>

<style module lang="scss">
.Separator.Separator {
  height: 1px;
  width: 100%;
  background-color: var(--regular_border-background);
}
</style>
