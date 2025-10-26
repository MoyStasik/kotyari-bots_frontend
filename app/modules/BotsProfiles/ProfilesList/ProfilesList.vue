<template>
  <div
    :class="$style.Wrapper"
  >
    <BotsProfilesSummary />
    <ProfilesTable />
  </div>
</template>

<script setup lang="ts">
import ProfilesTable from '../ProfilesTable/ProfilesTable.vue';
import BotsProfilesSummary from './BotsProfiles.summary.vue';

</script>

<style module lang="scss">
.Wrapper.Wrapper {
  display: flex;
  flex-direction: column;
  gap: 21px;
}
</style>
