<template>
  <div
    :class="$style.TableWrapper"
  >
    <ProfilesListHeader />
    <ProfilesTableList
      :list="profilesList"
    />
  </div>
</template>

<script setup lang="ts">
import { useProfilesStore } from '~/store/profiles/profiles';

import ProfilesListHeader from '../ProfilesList/ProfilesList.header.vue';
import ProfilesTableList from './ProfilesTable.list.vue';

const profilesStore = useProfilesStore();

const profilesList = computed(() => profilesStore.list);

const isLoaded = useState('profiles-list', () => false);

const onLoad = async () => {
  if (isLoaded.value) {
    return;
  }

  await profilesStore.getProfiles();
  isLoaded.value = true;
};

onServerPrefetch(async () => {
  await onLoad();
});

onMounted(async () => {
  await onLoad();
});
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
