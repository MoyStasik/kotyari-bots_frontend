<template>
  <div
    :class="$style.BotsListWrapper"
  >
    <BotsListHeader />
    <BotsTable
      :list="useBots.list"
    />
  </div>
</template>

<script setup lang="ts">
import { useBotsStore } from '~/store/bots/bots';

import BotsListHeader from './Bots.list.header.vue';
import BotsTable from '../BotsTable/Bots.table.vue';

const useBots = useBotsStore();

onServerPrefetch(async () => {
  try {
    await useBots.getBots();
  } catch (err) {
    console.error(err);
  }
});
</script>

<style module lang="scss">
.BotsListWrapper.BotsListWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  border-radius: var(--regular_border-radius);
  border: 1px solid var(--regular_border-background);
  padding: 20px;
}
</style>
