<template>
  <div
    :class="$style.Wrapper"
  >
    <ProfilesTableHeader />
    <template
      v-if="list.length"
    >
      <ProfilesTableItem
        v-for="(item, idx) in list"
        :id="item"
        :key="`profiles_${item}`"
        :last="idx + 1 === list.length"
      />
    </template>
    <div
      v-else
      :class="$style.EmptyProfilesList"
    >
      <Subtitle>
        Нет созданных профилей
      </Subtitle>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProfilesTableListProps as Props } from './ProfilesTable.types';

import ProfilesTableItem from './ProfilesTable.item.vue';
import ProfilesTableHeader from './ProfilesTableHeader.vue';

defineProps<Props>();
</script>

<style module lang="scss">
.Wrapper.Wrapper {
  border-radius: var(--regular_border-radius);
  border: 1px solid var(--regular_border-background);
  overflow: scroll;
}

.EmptyProfilesList.EmptyProfilesList {
  padding: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
