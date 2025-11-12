<template>
  <div
    :class="$style.BotsWrapper"
  >
    <BotsSummary />
    <ClientOnly>
      <TaskCreate
        v-if="botsList.length"
      />
    </ClientOnly>
    <BotsList
      :class="$style.BotsList"
    />
  </div>
</template>

<script setup lang="ts">
import { useBotsStore } from '~/store/bots/bots';

import BotsList from './BotsList/Bots.list.vue';
import BotsSummary from './Bots.summary.vue';
import TaskCreate from '../Task/TaskCreate.vue';

const useBots = useBotsStore();

const botsList = computed(() => useBots.list);
</script>

<style module lang="scss">
.BotsWrapper.BotsWrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.BotsList.BotsList {
  margin-top: 15px;
}
</style>
