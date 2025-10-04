<template>
  <Row
    :class="$style.InputWrapper"
  >
    <slot name="before"/>
    <input
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :style="{height: withPX(size)}"
      :class="[
          {
            [$style.Input]: true,
            [$style.WithoutIcon]: !$slots.before,
          }
      ]"
    />
  </Row>
</template>

<script setup lang="ts">
import type { Props } from './Input.types';

import { withPX  } from '@/utils/utils';

import Row from '../Row/Row.vue';

withDefaults(defineProps<Props>(), {
  size: 32,
});
</script>

<style module lang="scss">
.InputWrapper.InputWrapper {
  background-color: var(--input_background);
  border-radius: 8px;
  width: 100%;
}

.Input.Input {
  border: none;
  background-color: var(--input_background);
  border-radius: 0px 8px 8px 0px;
  width: 100%;
  padding-left: 10px;
  outline: none;
  transition: color 0.2s, box-shadow 0.2s;
  font-family: var(--base_ui-sans-typography);
  font-size: var(--regular_font-size);

  &:focus-visible {
    border-color: #a1a1a1;
    box-shadow: 0 0 0 3px #a1a1a1;
  }
}

.WithoutIcon.WithoutIcon {
  border-radius: 8px;
}
</style>
