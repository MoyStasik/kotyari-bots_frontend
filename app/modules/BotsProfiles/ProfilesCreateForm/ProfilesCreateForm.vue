<template>
  {{ profile }}
  <form>
    <Column
    :gap="20"
    >
      <Column
        :gap="7"
      >
        <Paragraph>
          Название профиля
        </Paragraph>
        <Input
          :value="profileName"
          name="name"
          :type="'text'"
          placeholder="Продавец консультант"
          @update:model-value="profileName = $event"
        />
      </Column>
      <Column
        :gap="7"
      >
        <Paragraph>
          Email
        </Paragraph>
        <Input
          :value="email"
          name="email"
          :type="'text'"
          placeholder="sales@example.com"
          @update:model-value="email = $event"
        />
      </Column>
      <Column
        :gap="7"
      >
        <Paragraph>
          Системный промпт
        </Paragraph>
        <Textarea
          :value="prompt"
          placeholder="Опишите роль и задачи профиля..."
          @update:model-value="prompt = $event as string"
        />
        <Subtitle
          :class="$style.Annotation"
        >
          Системный промпт определяет поведение и стиль общения бота при использовании этого профиля
        </Subtitle>
      </Column>
    </Column>
    <Row
      :gap="7"
      :class="$style.ButtonsRow"
    >
      <Button
        :mode="'transparent'"
        :size="'medium'"
        bordered
        @click="emit('close')"
      >
        Отмена
      </Button>
      <Button
        :mode="'active'"
        :size="'medium'"
        @click="profile ? onEditProfile() : onCreateProfile()"
      >
        {{ profile ? 'Сохранить изменения' : 'Создать профиль' }}
      </Button>
    </Row>
  </form>
</template>

<script setup lang="ts">
import type { Props } from './ProfilesCreateForm.types';
import type { CreateProfileRequestData } from '~/api/profiles/profiles.types';

import { useProfilesCreateForm } from './ProfilesCreateForm';

import Column from '~/components/Column/Column.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Input from '~/components/Input/Input.vue';
import Textarea from '~/components/Textarea/Textarea.vue';
import Row from '~/components/Row/Row.vue';
import Button from '~/components/Button/Button.vue';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'create:profile' | 'update:profile', payload: CreateProfileRequestData ): void,
  (event: 'close'): void,
}>();

const { profileName, email, prompt } = useProfilesCreateForm();

const onCreateProfile = () => {
  emit('create:profile', { name: profileName.value, email: email.value, prompt: prompt.value, });
};

const onEditProfile = () => {
  emit('update:profile', { name: profileName.value, email: email.value, prompt: prompt.value, });
};

const processProfileState = () => {
  if (!props.profile) {
    return;
  }

  profileName.value = props.profile?.name;
  email.value = props.profile?.email;
  prompt.value = props.profile?.systemPrompt;
};

watch(() => props.profile, () => {
  processProfileState();
}, { immediate: true, once: true });
</script>

<style module lang="scss">
.ButtonsRow.ButtonsRow {
  margin-top: 20px;
  justify-content: end;
}

.Annotation.Annotation {
  font-size: 13px;
}
</style>
