<template>
  <div
    :class="[
      $style.Card,
      {[$style.Card_Mobile]: isMobile}
    ]"
    :style="{
      height: withPX(size),
      minWidth: withPX(minWidth),
      maxWidth: withPX(maxWidth),
    }"
  >
    <Column
      :class="$style.CardContent"
      :gap="25"
    >
      <div
        :class="$style.CardHeader"
      >
        <slot name="header">
          <Paragraph
            :class="$style.CardHeaderText"
          >
            Всего ботов
          </Paragraph>
        </slot>
        <slot name="header_icon">
          <LucideBot />
        </slot>
      </div>
      <div
        :class="$style.MainContent"
      >
        <Title
          :level="1"
        >
          1
        </Title>
      </div>
    </Column>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Card.types';

import { withPX } from '~/utils/utils';

import Column from '../Column/Column.vue';
import Title from '../Title/Title.vue';

withDefaults(defineProps<Props>(), {
  size: 120,
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

.CardHeaderText.CardHeaderText {
  display: flex;
  width: 100%;
}

.MainContent.MainContent {
  display: flex;
  height: 100%;
  align-items: end;
}
</style>
