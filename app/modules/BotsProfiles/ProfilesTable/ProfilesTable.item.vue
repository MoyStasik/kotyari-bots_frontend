<template>
  <Row
    items-center
    :class="[
      $style.ProfilesItemWrapper, {
        [$style.ProfilesItemWrapper_Mobile]: isMobile,
      }
    ]"
  >
    <template
      v-for="item in getFormattedProfileInfo(profile)"
      :key="`column_${item.name}`"
    >
      <Paragraph
        v-if="!isMobile || isMobile && item.columnName !== 'Создан'"
        :style="{ minWidth: withPX(item.minWidth), maxWidth: withPX(item.minWidth)}"
      >
        {{ item.columnName !== 'Создан' ? item.name : item.name?.slice(0, 10) }}
      </Paragraph>
    </template>
    <ProfilesTableActions
      @profile-edit="$modal.open('ModalCreateProfile', { profileId: profile?.id })"
      @profile-delete="$modal.open('ModalDeleteProfile', { profileId: profile?.id })"
    />
  </Row>
  <Separator
    v-if="!last"
    :size="1"
  />
</template>

<script setup lang="ts">
import type { ProfilesTableItemProps as Props } from './ProfilesTable.types';

import { withPX } from '@/utils/utils';
import { useProfilesStore } from '~/store/profiles/profiles';
import { getFormattedProfileInfo } from './ProfilesTable.helpers';

import Row from '~/components/Row/Row.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import ProfilesTableActions from './ProfilesTableActions.vue';

const props = defineProps<Props>();

const { $modal } = useNuxtApp();
const { isMobile } = useAdaptivity();

const profilesStore = useProfilesStore();

const profile = computed(() => profilesStore.get(props.id));
</script>

<style module lang="scss">
.ProfilesItemWrapper.ProfilesItemWrapper {
  width: 100%;
  height: 45px;
  padding-inline-start: 7px;
}

.ProfilesItemWrapper_Mobile.ProfilesItemWrapper_Mobile {
  height: 50px;
}
</style>
