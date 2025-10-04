<template>
  <div
    :class="$style.TableWrapper"
  >
    <BotsTableHeader />
    <BotsTableItem
      v-for="item in list"
      :key="`bot_${item}`"
      :bot-id="item"
      @bot-edit="emit('bot-edit', item)"
      @bot-delete="emit('bot-delete', item)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Props } from './BotsTable.types';

import BotsTableItem from './Bots.table.item.vue';
import BotsTableHeader from './BotsTableHeader.vue';

defineProps<Props>();

const emit = defineEmits<{
  (event: 'bot-edit' | 'bot-delete', payload: string): void,
}>();
</script>

<style module lang="scss">
.TableWrapper.TableWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid var(--regular_border-background);
  border-radius: 8px;
  height: 200px;
  overflow: scroll;
}
</style>
