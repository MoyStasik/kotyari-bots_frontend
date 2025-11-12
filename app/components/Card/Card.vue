<template>
  <div
    :class="[
      $style.Card,
      {
        [$style.Card_Mobile]: isMobile,
        [$style.Card_Dashed]: dashed,
      }
    ]"
    :style="{
      height: withPX(size),
      minWidth: withPX(minWidth),
    }"
  >
    <Column
      :class="$style.CardContent"
    >
      <div
        :class="$style.CardHeader"
      >
        <slot name="header" />
        <slot name="header_icon" />
      </div>
      <slot />
    </Column>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Card.types';

import { withPX } from '~/utils/utils';

import Column from '../Column/Column.vue';

withDefaults(defineProps<Props>(), {
  minWidth: 165,
});

const { isMobile } = useAdaptivity();

</script>

<style module lang="scss">
.Card.Card {
  box-sizing: border-box;
  display: flex;
  padding: 20px;
  border: 1px solid var(--regular_border-background);
  border-radius: var(--regular_border-radius);
  transition: 0.2s border;
}

.Card_Dashed.Card_Dashed {
  border: thin dashed var(--regular_border-background);

  &:hover {
    border: thin dashed var(--accent-foreground);
  }
}

.Card_Mobile.Card_Mobile {
  width: 100%;
}

.CardContent.CardContent {
  width: 100%;
}

.CardHeader.CardHeader {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
