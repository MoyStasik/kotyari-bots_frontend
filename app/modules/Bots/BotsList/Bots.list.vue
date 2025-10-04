<template>
  <div
    :class="$style.BotsListWrapper"
  >
    <BotsListHeader
      @click:add="onAdd"
    />
    <BotsTable
      :list="useBots.list"
    />
    <ModalManager
      ref="modalManager"
    />
  </div>
</template>

<script setup lang="ts">
import { useBotsStore } from '~/store/bots/bots';

import BotsListHeader from './Bots.list.header.vue';
import BotsTable from '../BotsTable/Bots.table.vue';
import ModalManager from '~/modules/Modals/ModalManager/ModalManager.vue';

const useBots = useBotsStore();

const modalManager = ref<InstanceType<typeof ModalManager> | null>(null);

const onAdd = () => {
  modalManager.value?.onOpen();
};

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

.Modal {
  position: absolute;
  z-index: 999;
  top: 50%;
  left: 50%;
  border: 1px solid var(--regular_border-background);
  overflow: hidden;
}
</style>
