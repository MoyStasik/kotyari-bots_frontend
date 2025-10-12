<template>
  <Row
    :class="$style.RowItem"
    items-center
  >
    <Column
      :class="$style.ProfileInfo"
    >
      <Paragraph
        :class="$style.ProfileName"
      >
        {{ profile.name }}
      </Paragraph>
    </Column>
    <Button
      mode="transparent"
      :size="'small'"
      bordered
      :class="$style.Button"
      @click="emit('update:profiles', profile)"
    >
      Добавить
    </Button>
  </Row>
</template>

<script setup lang="ts">
import type { BotsProfilesAddItemProps as Props } from './BotsProfiles.types';

import Column from '~/components/Column/Column.vue';
import Row from '~/components/Row/Row.vue';
import type { Profile } from '~/store/bots/bots.types';

defineProps<Props>();

const emit = defineEmits<{
  (event: 'update:profiles', payload: Profile): void,
}>();
</script>

<style module lang="scss">
.RowItem.RowItem {
  padding: 7px;
  border: 1px solid var(--regular_border-background);
  border-radius: 4px;
}

.ProfileInfo.ProfileInfo {
  width: 100%;
}

.ProfileName.ProfileName {
  font-size: 14px;
  line-height: 21px;
}

.Button.Button {
  padding-inline: 16px;
}
</style>
