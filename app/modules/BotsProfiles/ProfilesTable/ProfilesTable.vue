<template>
  <div
    :class="$style.TableWrapper"
  >
    <ProfilesListHeader />
    <ProfilesTableList />
  </div>
</template>

<script setup lang="ts">
import ProfilesListHeader from '../ProfilesList/ProfilesList.header.vue';
import ProfilesTableList from './ProfilesTable.list.vue';

</script>

<style module lang="scss">
.TableWrapper.TableWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  border-radius: var(--regular_border-radius);
  border: 1px solid var(--regular_border-background);
  padding: 20px;
}
</style>
