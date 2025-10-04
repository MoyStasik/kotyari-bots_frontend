<template>
  <Input
    name="search"
    type="text"
    placeholder="Поиск ботов..."
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

</script>

<style module lang="scss">
.SearchIconWrapper.SearchIconWrapper {
  display: flex;
  align-items: center;
  padding-left: 10px;
}
</style>
