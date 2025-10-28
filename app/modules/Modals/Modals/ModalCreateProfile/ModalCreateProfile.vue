<template>
  <div
    :class="$style.Modal"
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
      />
    </Column>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './ModalCreateProfile.types';

import { useProfilesStore } from '~/store/profiles/profiles';

import Title from '~/components/Title/Title.vue';
import ModalHeader from '../ModalHeader/ModalHeader.vue';
import Column from '~/components/Column/Column.vue';
import ProfilesCreateForm from '~/modules/BotsProfiles/ProfilesCreateForm/ProfilesCreateForm.vue';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'close'): void,
}>();

const profilesStore = useProfilesStore();

const profile = computed(() => profilesStore.get(props?.profileId || ''));
</script>

<style module lang="scss">
.Modal.Modal {
  width: 405px;
}
</style>
