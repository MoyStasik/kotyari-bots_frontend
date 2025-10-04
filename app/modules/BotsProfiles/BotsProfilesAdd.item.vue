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
        {{ name }}
      </Paragraph>
      <Paragraph
        :class="$style.ProfileEmail"
      >
        {{ email }}
      </Paragraph>
    </Column>
    <Button
      mode="transparent"
      :size="'small'"
      bordered
      :class="$style.Button"
    >
      Добавить
    </Button>
  </Row>
</template>

<script setup lang="ts">
import type { BotsProfilesAddItemProps } from './BotsProfiles.types';

import Column from '~/components/Column/Column.vue';
import Row from '~/components/Row/Row.vue';

defineProps<BotsProfilesAddItemProps>();

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

.ProfileEmail.ProfileEmail {
  color: var(--subtitile_text-color);
}

.Button.Button {
  padding-inline: 16px;
}
</style>
