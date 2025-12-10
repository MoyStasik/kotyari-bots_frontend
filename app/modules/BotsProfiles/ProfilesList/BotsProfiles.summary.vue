<template>
  <div
    :class="$style.ProfilesSummary"
  >
    <Card
      v-for="[key, value] of Object.entries(summary)"
      :key="`summary_bots_${key}`"
      :min-width="cardWidth"
      :size="120"
    >
      <template #header>
        <Paragraph
          :class="$style.CardHeaderText"
        >
          {{ ProfilesSummary[key as ProfilesSummaryTitles].text }}
        </Paragraph>
      </template>
      <template #header_icon>
        <component
          :is="icons[ProfilesSummary[key as ProfilesSummaryTitles].icon]"
          :size="14"
        />
      </template>
      <Title
        :level="1"
        :class="$style.Amount"
      >
        {{ value }}
      </Title>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { LucideFileText, LucideMail, LucideUsers } from 'lucide-vue-next';
import type { FunctionalComponent } from 'vue';

import { ProfilesSummary, type ProfilesSummaryTitles } from './ProfilesList.constants';

import { useProfilesStore } from '~/store/profiles/profiles';
import { useBotsStore } from '~/store/bots/bots';

import Card from '~/components/Card/Card.vue';
import Title from '~/components/Title/Title.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';

const { isDesktop, isTablet } = useAdaptivity();

const profilesStore = useProfilesStore();
const botsStore = useBotsStore();

const wasLoad = useState('profile-summary', () => false);

const icons: Record<string, FunctionalComponent> = {
  'LucideMail': LucideMail,
  'LucideUsers': LucideUsers,
  'LucideFileText': LucideFileText,
};

const summary = computed(() => profilesStore.summary);

const cardWidth = computed(() => {
  if (isDesktop.value) {
    return (1130 - 2 * 15) / 3;
  }

  if (isTablet.value) {
    return (698 - 2 * 15) / 3;
  }

  return '100%';
});

const onLoad = async () => {
  if (wasLoad.value) {
    wasLoad.value = false;
    return;
  }

  wasLoad.value = true;
  try {
    await botsStore.getSummary();
  } catch (err) {
    console.error(err);
  }
};

onServerPrefetch(async () => {
  await onLoad();
});

onMounted(async () => {
  await onLoad();
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
