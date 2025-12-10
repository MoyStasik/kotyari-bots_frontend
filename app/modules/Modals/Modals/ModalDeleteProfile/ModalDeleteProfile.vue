<template>
  <Column
    :gap="8"
    :class="{
      [$style.Modal_Wide]: !isMobile,
      [$style.Modal_Mobile]: isMobile,
    }"
  >
    <Title
      :level="2"
    >
      Удалить профиль?
    </Title>
    <Subtitle
      :class="$style.Text"
    >
      Вы действительно хотите удалить профиль <strong>"{{ profile?.name }}"</strong>?
    </Subtitle>
    <div
      :class="{
        [$style.ButtonsWrapper]: true,
        [$style.ButtonsWrapper_Wide]: !isMobile,
      }"
    >
      <Button
        :mode="'transparent'"
        bordered
        :class="{[$style.Button]: isMobile}"
        @click="emit('close')"
      >
        Отмена
      </Button>
      <Button
        :mode="'danger'"
        :class="{[$style.Button]: isMobile}"
        @click="onDeleteProfile"
      >
        Удалить
      </Button>
    </div>
  </Column>
</template>

<script setup lang="ts">
import type { Props } from './ModalDeleteProfile.types';

import { useProfilesStore } from '~/store/profiles/profiles';

import Column from '~/components/Column/Column.vue';
import Title from '~/components/Title/Title.vue';
import Button from '~/components/Button/Button.vue';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'close'): void,
}>();

const { isMobile } = useAdaptivity();

const profilesStore = useProfilesStore();

const profile = computed(() => profilesStore.get(props.profileId));

const onDeleteProfile = async () => {
  await profilesStore.deleteProfile({ profileId: props.profileId });
  emit('close');
};
</script>

<style module lang="scss">
.Modal_Wide.Modal_Wide {
  width: 450px;
}

.Modal_Mobile.Modal_Mobile {
  width: calc(100vw - 40px);
}

.Text.Text {
  font-size: 13px;
}

.ButtonsWrapper.ButtonsWrapper {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.ButtonsWrapper_Wide.ButtonsWrapper_Wide {
  justify-content: end;
}

.ButtonsWrapper_Mobile.ButtonsWrapper_Mobile {
  flex-wrap: wrap;
}

.Button.Button {
  width: 100%;
}
</style>
