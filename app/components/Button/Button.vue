<template>
  <button
    :class="{
      [$style.Button]: true,
      [$style.Button_gaped]: $slots.before,
      [$style.ActiveMode]: mode === 'active',
      [$style.TransparentMode]: mode === 'transparent',
      [$style.LightMode]: mode === 'light',
      [$style.DangerMode]: mode === 'danger',
    }"
    :style="{ height: withPX(buttonSizes[size])}"
  >
    <slot name="before"/>
    <Paragraph
      :class="{
        [$style.Colored]: mode === 'danger' || mode === 'active'
      }"
    >
      <slot/>
    </Paragraph>
  </button>
</template>

<script setup lang="ts">
import type { Props, size } from './Button.types';

import { withPX } from '~/utils/utils';

import Paragraph from '../Paragraph/Paragraph.vue';

withDefaults(defineProps<Props>(), {
  size: 'medium',
  mode: 'light',
});

const buttonSizes: Record<size, number> = {
  'small': 28,
  'medium': 32,
}
</script>

<style module lang="scss">
.Button.Button {
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.Button_gaped.Button_gaped {
  gap: 4px;
}

.ActiveMode.ActiveMode {
  background-color: var(--accent-foreground);
}

.TransparentMode.TransparentMode {
  background-color: #fff;

  &:hover {
    background-color: rgba(233, 235, 239, 0.92);
  }

  &:active {
    background-color: var(--active_button-background);
  }
}

.LightMode.LightMode {
  background-color: #fff;

  &:hover {
    background-color: rgba(233, 235, 239, 0.92);
  }

  &:active {
    background-color: var(--active_button-background);
  }
}

.DangerMode.DangerMode {
  background-color: tomato;
}

.Colored.Colored {
  color: #fff;
}
</style>
