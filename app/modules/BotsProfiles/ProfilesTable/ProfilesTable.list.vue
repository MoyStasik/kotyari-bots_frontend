<template>
  <div
    :class="$style.Wrapper"
  >
    <ProfilesTableHeader />
    <ProfilesTableItem />
  </div>
</template>

<script setup lang="ts">
import ProfilesTableItem from './ProfilesTable.item.vue';
import ProfilesTableHeader from './ProfilesTableHeader.vue';

</script>

<style module lang="scss">
.Wrapper.Wrapper {
  border-radius: var(--regular_border-radius);
  border: 1px solid var(--regular_border-background);
}
</style>
