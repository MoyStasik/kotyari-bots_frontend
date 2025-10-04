<template>
  <BotsProfilesAddItem
    v-for="item in BotsProfiles"
    :key="`profile_${item.name}`"
    v-bind="item"
  />
</template>

<script setup lang="ts">
import { BotsProfiles } from './BotsCreateForm.constants';

import BotsProfilesAddItem from '~/modules/BotsProfiles/BotsProfilesAdd.item.vue';

</script>

<style module lang="scss">
</style>
