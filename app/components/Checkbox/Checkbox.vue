<template>
  <input
    :name="name"
    :type="'checkbox'"
    :class="$style.Checkbox"
  />
</template>

<script setup lang="ts">
import type { Props } from './Checkbox.types';

defineProps<Props>();
</script>

<style module lang="scss">
.Checkbox.Checkbox {
  width: 14px;
  height: 14px;
  border-radius: 8px;
  background-color: var(--input_background);
}
</style>
