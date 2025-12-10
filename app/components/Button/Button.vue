<template>
  <button
    :class="{
      [$style.Button]: true,
      [$style.Button_gaped]: $slots.before,
      [$style.ActiveMode]: mode === 'active',
      [$style.TransparentMode]: mode === 'transparent',
      [$style.DangerMode]: mode === 'danger',
      [$style.Bordered]: bordered,
    }"
    :disabled="disabled"
    :style="{ height: withPX(buttonSizes[size])}"
    @click.prevent
  >
    <slot name="before"/>
    <Paragraph
      v-if="slots.default"
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
  mode: 'transparent',
});

const slots = useSlots();

const buttonSizes: Record<size, number> = {
  'small': 28,
  'medium': 32,
};
</script>

<style module lang="scss">
.Button.Button {
  border-radius: var(--small_border-radius);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  padding: 0;
  padding-inline: 8px;

  &:disabled {
    opacity: 0.5;
  }
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

.DangerMode.DangerMode {
  background-color: tomato;
}

.Colored.Colored {
  color: #fff;
}

.Bordered.Bordered {
  border: 1px solid var(--regular_border-background);
}
</style>
