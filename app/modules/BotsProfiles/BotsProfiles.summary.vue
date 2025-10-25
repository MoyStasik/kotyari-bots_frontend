<template>
  <div
    :class="$style.ProfilesSummary"
  >
    <Card
      v-for="item in 3"
      :key="`summary_bots_${item}`"
      :min-width="cardWidth"
      :size="120"
    >
      <template #header>
        <Paragraph
          :class="$style.CardHeaderText"
        >
          Всего профилей
        </Paragraph>
      </template>
      <template #header_icon>
        <LucideUsers />
      </template>
      <Title
        :level="1"
        :class="$style.Amount"
      >
        10
      </Title>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { LucideUsers } from 'lucide-vue-next';

import Card from '~/components/Card/Card.vue';
import Title from '~/components/Title/Title.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';

const { isDesktop, isTablet } = useAdaptivity();

const cardWidth = computed(() => {
  if (isDesktop.value) {
    return (1130 - 4 * 15) / 3;
  }

  if (isTablet.value) {
    return (698 - 2 * 15) / 3;
  }

  return '100%';
});
</script>

<style module lang="scss">
.ProfilesSummary.ProfilesSummary {
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
