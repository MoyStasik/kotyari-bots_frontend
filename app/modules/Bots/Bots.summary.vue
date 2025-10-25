<template>
  <div
    :class="$style.BotsSummary"
  >
    <Card
      v-for="item in summaryKeys"
      :key="`summary_bots_${item}`"
      :min-width="cardWidth"
      :size="120"
    >
      <template #header>
        <Paragraph
          :class="$style.CardHeaderText"
        >
          {{ botsSummary[item as keyof GetBostSummaryResponseData].text }}
        </Paragraph>
      </template>
      <template #header_icon>
        <component
          :is="icons[botsSummary[item as keyof GetBostSummaryResponseData].icon]"
          :size="14"
        />
      </template>
      <Title
        :level="1"
        :class="$style.Amount"
      >
        {{ summary[item as keyof GetBostSummaryResponseData] }}
      </Title>
    </Card>
  </div>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

import type { GetBostSummaryResponseData } from '~/api/bots/bots.types';

import { useBotsStore } from '~/store/bots/bots';
import { botsSummary } from './Bots.helpers';

import Title from '~/components/Title/Title.vue';
import Card from '~/components/Card/Card.vue';

const LucideBot = defineAsyncComponent(() =>
  import('lucide-vue-next').then(module => module.BotIcon)
);

const LucideUsers = defineAsyncComponent(() =>
  import('lucide-vue-next').then(module => module.UsersIcon)
);

const botsStore = useBotsStore();
const { isDesktop, isTablet } = useAdaptivity();

const icons: Record<string, FunctionalComponent> = {
  'LucideBot': LucideBot,
  'LucideUsers': LucideUsers,
};

const summary = computed(() => botsStore.summary);
const summaryKeys = computed(() => Object.keys(summary.value));

// TODO подумать над resize observer
const cardWidth = computed(() => {
  if (isDesktop.value) {
    return summaryKeys.value.length >= 5 ? (1130 - 4 * 15) / 5 : (1130 - (summaryKeys.value.length - 1) * 15) / summaryKeys.value.length; // 5 карточек в строке если Desktop
  }

  if (isTablet.value) {
    return summaryKeys.value.length >= 3 ? (698 - 2 * 15) / 3 : (698 - (summaryKeys.value.length - 1) * 15) / summaryKeys.value.length; // 3 карточки в строке если Tablet
  }

  return '100%';
});

onServerPrefetch(async () => {
  await botsStore.getSummary();
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
