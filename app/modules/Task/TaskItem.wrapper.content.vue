<template>
  <div :class="$style.ContentWrapper">
    <!-- Режим редактирования -->
    <Column v-if="isEditing" :gap="14">
      <Column :gap="7">
        <Paragraph :class="$style.Subtitle">
          Заголовок поста:
        </Paragraph>
        <Input
          :value="formTitle"
          name="text"
          type="text"
          placeholder="Введите заголовок..."
          :class="{ [$style.InputError]: !!titleError }"
          @update:model-value="handleTitleInput"
        />
        <span v-if="titleError" :class="$style.ErrorText">
          {{ titleError }}
        </span>
      </Column>
      <Column :gap="7">
        <Paragraph :class="$style.Subtitle">
          Текст поста:
        </Paragraph>
        <Textarea
          :value="formText"
          placeholder="Введите текст поста..."
          :min-height="100"
          @update:model-value="formText = $event as string"
        />
      </Column>
    </Column>

    <!-- Режим просмотра -->
    <Column v-else :gap="7">
      <Column :gap="7">
        <Paragraph :class="$style.Subtitle">
          Заголовок поста:
        </Paragraph>
        <Paragraph>
          {{ post?.title }}
        </Paragraph>
      </Column>
      <Column :gap="7">
        <Paragraph :class="$style.Subtitle">
          Текст поста:
        </Paragraph>
        <Paragraph>
          {{ post?.text }}
        </Paragraph>
      </Column>
    </Column>
  </div>

  <div :class="$style.ButtonAfter">

    <!-- Сообщение об успехе (видна только если опубликован) -->
    <div v-if="isPublished" :class="$style.SuccessMessage">
      Пост успешно опубликован
    </div>

    <!-- Кнопки в режиме редактирования -->
    <template v-if="isEditing">
      <Button
        :mode="'transparent'"
        bordered
        @click="cancelEdit"
      >
        Отмена
      </Button>
      <Button
        :mode="'active'"
        @click="saveEdit"
      >
        Сохранить
      </Button>
    </template>

    <!-- Кнопки в режиме просмотра -->
    <template v-else>
      <Button
        :mode="'transparent'"
        bordered
        :disabled="isPublished"
        @click="startEditing"
      >
        <template #before>
          <LucidePencil :size="14" />
        </template>
        Редактировать
      </Button>

      <Button
        :mode="isPublished ? 'transparent' : 'active'"
        :disabled="isPublished || isPublishing"
        @click="onPublish"
      >
        <!-- Меняем иконку и текст в зависимости от статуса -->
        <template #before v-if="isPublished">
          <LucideCheck :size="16" />
        </template>
        {{ isPublished ? 'Опубликовано' : (isPublishing ? 'Публикация...' : 'Опубликовать') }}
      </Button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { LucidePencil, LucideCheck } from 'lucide-vue-next'; // Добавил LucideCheck

import type { TaskItemWrapperContentProps as Props } from './Task.types';

import { usePostsStore } from '~/store/posts/posts';

import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Column from '~/components/Column/Column.vue';
import Button from '~/components/Button/Button.vue';
import Input from '~/components/Input/Input.vue';
import Textarea from '~/components/Textarea/Textarea.vue';

const props = defineProps<Props>();

const usePosts = usePostsStore();
const post = computed(() => usePosts.get(props.id));

// Состояние редактирования
const isEditing = ref(false);
const formTitle = ref('');
const formText = ref('');
const titleError = ref('');

// Состояния публикации
const isPublished = ref(false);
const isPublishing = ref(false);

// Регулярки для гласных и согласных (RU + EN)
const VOWELS_REGEX = /[aeiouyаеёиоуыэюя]/gi;
const CONSONANTS_REGEX = /[bcdfghjklmnpqrstvwxzбвгджзйклмнпрстфхцчшщ]/gi;

const startEditing = () => {
  formTitle.value = post.value?.title || '';
  formText.value = post.value?.text || '';
  titleError.value = '';
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  titleError.value = '';
};

const handleTitleInput = (val: string) => {
  formTitle.value = val;
  if (titleError.value) titleError.value = '';
};

const validateTitle = (): boolean => {
  const title = formTitle.value.trim();

  // 1. Не пустой
  if (!title) {
    titleError.value = 'Заголовок не может быть пустым';
    return false;
  }

  // 2. Не менее 10 символов
  if (title.length < 10) {
    titleError.value = 'Минимум 10 символов';
    return false;
  }

  // 3. Минимум 3 гласные
  const vowelsCount = (title.match(VOWELS_REGEX) || []).length;
  if (vowelsCount < 3) {
    titleError.value = 'Заголовок должен содержать минимум 3 гласные буквы';
    return false;
  }

  // 4. Минимум 3 согласные
  const consonantsCount = (title.match(CONSONANTS_REGEX) || []).length;
  if (consonantsCount < 3) {
    titleError.value = 'Заголовок должен содержать минимум 3 согласные буквы';
    return false;
  }

  return true;
};

const saveEdit = async () => {
  if (!validateTitle()) return;

  try{
    await usePosts.updatePost(props.id, {
      title: formTitle.value,
      text: formText.value
    });
  } catch (err) {
    console.error(err);
  }

  isEditing.value = false;
};

const onPublish = async () => {
  if (isPublished.value || isPublishing.value) return;

  try {
    isPublishing.value = true;
    await usePosts.publishPost(props.id, { approved: true });

    // Если запрос прошел успешно, блокируем кнопку и показываем сообщение
    isPublished.value = true;
  } catch (err) {
    console.error(err);
  } finally {
    isPublishing.value = false;
  }
};
</script>

<style module lang="scss">
.ContentWrapper.ContentWrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--info-message_background-color);
  border-radius: var(--small_border-radius);
  padding: 14px;
  gap: 14px;
}

.ButtonAfter.ButtonAfter {
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center; /* Чтобы текст успеха был по центру по вертикали */
  gap: 8px;
}

.Subtitle.Subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
}

.ErrorText.ErrorText {
  font-size: 12px;
  color: #ef4444;
  margin-top: -2px;
  font-family: var(--base_ui-sans-typography);
}

/* Стилизация ошибки инпута */
.InputError :global(input) {
  border-color: #ef4444 !important;
}

/* Fallback */
.InputError {
  border-color: #ef4444 !important;
}

/* Стиль для сообщения об успехе */
.SuccessMessage {
  margin-right: auto; /* Прижимает сообщение влево, а кнопки остаются справа */
  font-size: 13px;
  color: #10b981; /* Зеленый цвет */
  font-weight: 500;
  animation: fadeIn 0.3s ease-in-out;
  font-family: var(--base_ui-sans-typography);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(2px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
