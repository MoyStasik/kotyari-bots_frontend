<template>
  <textarea
    v-bind="$props"
    :class="$style.Textarea"
  />
</template>

<script setup lang="ts">
import type { Props } from './Textarea.types';

defineProps<Props>();

</script>

<style module lang="scss">
.Textarea.Textarea {
  font-family: var(--base_ui-sans-typography);
  font-size: var(--regular_font-size);
  resize: none;
  min-height: 100px;
  width: 100%;
  display: flex;
  field-sizing: content;
  padding: 10px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: var(--input_background);
  transition: color 0.2s, box-shadow 0.2s;

  &:focus-visible {
    border-color: #a1a1a1;
    box-shadow: 0 0 0 3px #a1a1a1;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
