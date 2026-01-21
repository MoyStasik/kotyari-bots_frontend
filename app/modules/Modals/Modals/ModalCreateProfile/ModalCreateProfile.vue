<template>
  <div
    :class="[
      $style.Modal,
      {[$style.Modal_Mobile]: isMobile},
    ]"
  >
    <Column
      :gap="15"
    >
      <ModalHeader
        @close="emit('close')"
      >
        <Title
          :level="2"
        >
          {{ profile ? 'Редактировать профиль' : 'Создать новый профиль' }}
        </Title>
      </ModalHeader>
      <ProfilesCreateForm
        :profile="profile"
        @create:profile="onCreateProfile"
        @update:profile="onUpdateProfile"
        @close="emit('close')"
      />
    </Column>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './ModalCreateProfile.types';
import type { CreateProfileRequestData } from '~/api/profiles/profiles.types';

import { useProfilesStore } from '~/store/profiles/profiles';

import Title from '~/components/Title/Title.vue';
import ModalHeader from '../ModalHeader/ModalHeader.vue';
import Column from '~/components/Column/Column.vue';
import ProfilesCreateForm from '~/modules/BotsProfiles/ProfilesCreateForm/ProfilesCreateForm.vue';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'close'): void,
}>();

const { isMobile } = useAdaptivity();

const profilesStore = useProfilesStore();

const profile = computed(() => profilesStore.get(props?.profileId || ''));

const onCreateProfile = async (payload: CreateProfileRequestData) => {
  await profilesStore.createProfile(payload);
  emit('close');
};

const onUpdateProfile = async (payload: CreateProfileRequestData) => {
  await profilesStore.updateProfile(props.profileId || '', payload);
  emit('close');
};
</script>

<style module lang="scss">
.Modal.Modal {
  width: 450px;
}

.Modal_Mobile.Modal_Mobile {
  width: 320px;
}
</style>
