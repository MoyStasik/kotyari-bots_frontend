<template>
  <div
    :class="$style.TableWrapper"
  >
    <BotsTableHeader />
    <div
      v-if="list.length"
      :class="$style.ItemsWrapper"
    >
      <BotsTableItem
        v-for="(item, idx) in list"
        :key="`bot_${item}`"
        :bot-id="item"
        :last="idx + 1 === list.length"
        @bot-edit="emit('bot-edit', item)"
        @bot-delete="emit('bot-delete', item)"
      />
    </div>
    <div
      v-else
      :class="$style.EmptyBotsList"
    >
      <Subtitle>
        Нет созданных ботов
      </Subtitle>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './BotsTable.types';

import BotsTableItem from './Bots.table.item.vue';
import BotsTableHeader from './BotsTableHeader.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue';

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
  border-radius: var(--smal_border-radius);
  overflow: scroll;
}

.ItemsWrapper.ItemsWrapper {
  max-height: 360px;
  overflow: scroll;
}

.EmptyBotsList.EmptyBotsList {
  padding: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
