<template>
  <Input
    :value="value"
    name="search"
    type="text"
    placeholder="Поиск ботов..."
    @update:model-value="value = $event"
  >
    <template #before>
      <div
        :class="$style.SearchIconWrapper"
      >
        <LucideSearch
          :size="14"
        />
      </div>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { LucideSearch } from 'lucide-vue-next';

import type { SearchInputProps as Props } from './Search.types';

defineProps<Props>();
</script>

<style module lang="scss">
.SearchIconWrapper.SearchIconWrapper {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>
