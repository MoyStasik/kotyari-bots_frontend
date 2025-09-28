/* eslint-disable */
<template>
  <!-- TODO: продумать размеры под другие устройства, мб скрыть некоторые поля -->
  <Row
    items-center
    :class="[
      $style.BotsItemWrapper,
      {[$style.BotsItemWrapper_Mobile]: isMobile}
    ]"
  >
    <Paragraph
      v-for="item in getFormattedBotInfo(bot)"
      :key="`column_${item.name}`"
      :style="{ minWidth: withPX(item.minWidth), maxWidth: withPX(item.minWidth)}"
    >
      {{ item.name }}
    </Paragraph>
    <BotsTableActions />
  </Row>
</template>

<script setup lang="ts">
import type { BotsTableItemProps as Props } from './BotsTable.types';

import { useBotsStore } from '~/store/bots/bots';
import { withPX } from '@/utils/utils';
import { getFormattedBotInfo } from './Bots.table.helpers';

import Row from '~/components/Row/Row.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import BotsTableActions from './Bots.table.actions.vue';

const props = defineProps<Props>();

const { isMobile } = useAdaptivity();

const useBots = useBotsStore();

const bot = computed(() => useBots.get(props.botId));
</script>

<style module lang="scss">
.BotsItemWrapper.BotsItemWrapper {
  width: 100%;
  height: 45px;
  padding-inline-start: 7px;
  border-bottom: 1px solid var(--regular_border-background);
}

.BotsItemWrapper_Mobile.BotsItemWrapper_Mobile {
  height: 50px;
}
</style>
