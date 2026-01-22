<template>
  <form @submit.prevent>
    <Column
      :gap="20"
    >
      <Column
        :gap="7"
      >
        <Paragraph>
          Название профиля
        </Paragraph>

        <!-- Добавил обработку очистки ошибки при вводе -->
        <Input
          :value="profileName"
          name="name"
          :type="'text'"
          placeholder="Продавец консультант"
          :class="{ [$style.inputErrorBorder]: !!nameError }"
          @update:model-value="handleNameInput"
        />

        <!-- Вывод сообщения об ошибке -->
        <span v-if="nameError" :class="$style.errorText">
          {{ nameError }}
        </span>
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
        @click="handleSubmit"
      >
        {{ profile ? 'Сохранить изменения' : 'Создать профиль' }}
      </Button>
    </Row>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'; // Явно импортируем ref
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

// Состояние для ошибки названия
const nameError = ref('');

// Очистка ошибки при вводе
const handleNameInput = (val: any) => {
  profileName.value = val;
  if (nameError.value) {
    nameError.value = '';
  }
};

// Функция валидации
const validate = (): boolean => {
  if (!profileName.value || String(profileName.value).trim().length === 0) {
    nameError.value = 'Пожалуйста, введите название профиля';
    return false;
  }
  return true;
};

// Единый метод отправки (чтобы не дублировать валидацию)
const handleSubmit = () => {
  if (!validate()) return;

  if (props.profile) {
    onEditProfile();
  } else {
    onCreateProfile();
  }
};

const onCreateProfile = () => {
  emit('create:profile', {
    name: profileName.value,
    email: email.value,
    prompt: prompt.value
  });
};

const onEditProfile = () => {
  emit('update:profile', {
    name: profileName.value,
    email: email.value,
    prompt: prompt.value
  });
};

const processProfileState = () => {
  if (!props.profile) {
    return;
  }

  profileName.value = props.profile?.name;
  email.value = props.profile?.email;
  prompt.value = props.profile?.prompt;
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

/* Стили для ошибки */
.errorText {
  font-size: 12px;
  color: #ef4444; /* Красный цвет */
  margin-top: -2px; /* Чуть придвинуть к инпуту */
  font-family: var(--base_ui-sans-typography);
}

/* Опционально: стиль для обводки инпута при ошибке */
/* Если ваш компонент Input прокидывает классы на сам input, это сработает */
.inputErrorBorder :global(input) {
  border-color: #ef4444 !important;
}
/* Альтернатива, если Input это обертка */
.inputErrorBorder {
  border-color: #ef4444 !important;
}
</style>
