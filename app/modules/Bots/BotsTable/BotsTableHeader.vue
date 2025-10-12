<template>
  <Row
    :class="$style.BotsItemWrapper"
    items-center
  >
    <template
      v-for="(item, idx) in Object.entries(TableHeader)"
      :key="`table_${idx}`"
    >
      <Paragraph
        v-if="item[0] !== 'Создан'"
        :style="{ minWidth: withPX(isDesktop ? item[1].minWidth + 70 : item[1].minWidth) }"
      >
        {{ item[0] }}
      </Paragraph>
    </template>
    <Paragraph>
      Действия
    </Paragraph>
  </Row>
</template>

<script setup lang="ts">
import Row from '~/components/Row/Row.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';

import { TableHeader } from './Bots.table.constants';
import { withPX } from '@/utils/utils';

const { isDesktop } = useAdaptivity();

</script>

<style module lang="scss">
.BotsItemWrapper.BotsItemWrapper {
  width: 100%;
  height: 35px;
  overflow: hidden;
  padding-inline-start: 7px;
  border-bottom: 1px solid var(--regular_border-background);
}
</style>
