<template>
  <textarea
    v-bind="$props"
    :value="value"
    :class="$style.Textarea"
    :style="{ minHeight: withPX(props.minHeight) }"
    @input="(event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value)"
  />
</template>

<script setup lang="ts">
import type { Props } from './Textarea.types';

import { withPX } from '~/utils/utils';

const props = withDefaults(defineProps<Props>(), {
  minHeight: 100,
});

const emit = defineEmits<{
  (event: 'update:modelValue', payload: typeof props.value): void,
}>();
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
  border-radius: var(--small_border-radius);
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
