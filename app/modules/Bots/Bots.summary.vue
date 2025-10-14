<template>
  <div
    :class="$style.BotsSummary"
  >
    <Card
      v-for="item in count"
      :key="item"
      :min-width="cardWidth"
      :size="120"
    >
      <template #header>
        <Paragraph
          :class="$style.CardHeaderText"
        >
          Всего ботов
        </Paragraph>
      </template>
      <template #header_icon>
        <LucideBot />
      </template>
      <Title
        :level="1"
        :class="$style.Amount"
      >
        1
      </Title>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { LucideBot } from 'lucide-vue-next';

import Title from '~/components/Title/Title.vue';
import Card from '~/components/Card/Card.vue';

withDefaults(defineProps<{ count?: number }>(), {
  count: 5,
});

const { isDesktop, isTablet } = useAdaptivity();

// TODO подумать над resize observer
const cardWidth = computed(() => {
  if (isDesktop.value) {
    return (1130 - 4 * 15) / 5; // 5 карточек в строке если Desktop
  }

  if (isTablet.value) {
    return (698 - 2 * 15) / 3; // 3 карточки в строке если Tablet
  }

  return '100%'; //
});
</script>

<style module lang="scss">
.BotsSummary.BotsSummary {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
  flex-direction: row;
  margin-bottom: 15px;
}

.CardHeaderText.CardHeaderText {
  display: flex;
  width: 100%;
}

.Amount.Amount {
  display: flex;
  height: 100%;
  align-items: end;
}
</style>
