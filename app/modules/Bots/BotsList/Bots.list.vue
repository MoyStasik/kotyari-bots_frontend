<template>
  <div
    :class="$style.BotsListWrapper"
  >
    <BotsListHeader
      @click:add="onAdd"
    />
    <BotsTable
      :list="useBots.list"
      @bot-edit="onBotEdit"
      @bot-delete="onBotDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { useBotsStore } from '~/store/bots/bots';

import BotsListHeader from './Bots.list.header.vue';
import BotsTable from '../BotsTable/Bots.table.vue';

const { $modal } = useNuxtApp();

const useBots = useBotsStore();

const editBot = ref(false);
const botID = ref('');
const isLoad = useState('bots-list', () => false);

const onAdd = (edit?: boolean) => {
  $modal.open('ModalCreateBot', {});
  editBot.value = !!edit;
};

const onBotDelete = (botId: string) => {
  $modal.open('ModalDeleteBot', {
    botId,
  });
};

const onBotEdit = (botId: string) => {
  botID.value = botId;
  $modal.open('ModalCreateBot', {
    botId: botId,
  });
};

const load = async () => {
  if (isLoad.value) {
    return;
  }

  isLoad.value = true;

  try {
    await useBots.getBots();
  } catch (err) {
    console.error(err);
  }
};

onServerPrefetch(async () => {
  await load();
});

onMounted(async () => {
  await load();
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

.Modal {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  border: 1px solid var(--regular_border-background);
  overflow: hidden;
}
</style>
