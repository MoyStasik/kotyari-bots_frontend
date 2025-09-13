<template>
  <Row
    :class="$style.InputWrapper"
  >
    <slot name="before">
    </slot>
    <input
      :type="type"
      :placeholder="placeholder"
      :class="$style.Input"
    />
  </Row>
</template>

<script setup lang="ts">
import type { Props } from './Input.types';

import Row from '../Row/Row.vue';

defineProps<Props>();

</script>

<style module lang="scss">
.InputWrapper.InputWrapper {
  background-color: var(--input_background);
  border-radius: 8px;
  width: 100%;
  max-width: 330px;
}

.Input.Input {
  border: none;
  background-color: var(--input_background);
  border-radius: 0px 8px 8px 0px;
  width: 100%;
}
</style>
