<template>
  <form @submit.prevent>
    <Column
      :gap="20"
    >
      <Row
        :gap="7"
        items-center
        :class="$style.Row"
      >
        <LucideZap
          :size="14"
        />
        <Paragraph
          :class="$style.Paragraph"
        >
          Быстрое создание задачи
        </Paragraph>
        <LucideX
          :size="14"
          :class="$style.IconCancel"
          @click="emit('close')"
        />
      </Row>
      <Row>
        <Column
          :gap="7"
          :class="$style.PickedBotWrapper"
        >
          <Paragraph>
            Выберите бота
          </Paragraph>
          <PopperList
            :bots="bots"
            @bot-change="onPickedBotChange"
          />
        </Column>
        <Column
          v-if="pickedBotId"
          :gap="7"
          :class="$style.PickedProfilesWrapper"
        >
          <Paragraph>
            Профили для задачи
          </Paragraph>
          <Row
            v-if="!pickedProfiles.length"
            :gap="4"
            items-center
          >
            <LucideCircleAlert
              :size="11"
              :color="'var(--warning_color-orange)'"
            />
            <Paragraph
              :class="$style.ProfileRequiredText"
            >
              Выберите хотя бы один профиль
            </Paragraph>
          </Row>
          <div
            :class="$style.PickedProfiles"
          >
            <Subtitle
              v-if="!pickedProfiles.length"
            >
              Выберите профили
            </Subtitle>
            <BotsProfilesPinned
              v-else
              :profiles="pickedProfiles"
              @remove-profile="onRemoveProfile"
            />
          </div>
        </Column>
      </Row>
      <Column
        v-if="pickedBot && availableProfiles?.length"
        :gap="7"
      >
        <Paragraph>
          Доступные профили:
        </Paragraph>
        <BotsProfilesAddItem
          v-for="profile in availableProfiles"
          :key="`task_pinned_profile_${profile?.id}`"
          :profile="profile"
          @update:profiles="onUpdateProfiles"
        />
      </Column>
      <Column
        :gap="7"
      >
        <Paragraph>
          Описание задачи
        </Paragraph>

        <!-- Добавил класс ошибки и обработчик ввода -->
        <Textarea
          :placeholder="'Опишите, что должен сделать бот...'"
          :value="prompt"
          :min-height="56"
          :class="{ [$style.inputErrorBorder]: !!promptError }"
          @update:model-value="handlePromptInput($event as string)"
        />

        <!-- Вывод текста ошибки -->
        <span v-if="promptError" :class="$style.errorText">
          {{ promptError }}
        </span>
      </Column>
      <Row
        :gap="7"
        :class="$style.ButtonsRow"
      >
        <Button
          :mode="'transparent'"
          bordered
          @click="emit('close')"
        >
          Отмена
        </Button>
        <Button
          :mode="'active'"
          :disabled="!!disableCreate"
          @click="onTaskCreate"
        >
          Создать задачу
        </Button>
      </Row>
    </Column>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { LucideZap, LucideX, LucideCircleAlert } from 'lucide-vue-next';

import type { BotsState } from '~/store/bots/bots.types';
import type { Profile } from '~/store/profiles/profiles.types';

import { useBotsStore } from '~/store/bots/bots';
import { usePostsStore } from '~/store/posts/posts';

import Column from '~/components/Column/Column.vue';
import Row from '~/components/Row/Row.vue';
import Textarea from '~/components/Textarea/Textarea.vue';
import Button from '~/components/Button/Button.vue';
import PopperList from '~/components/PopperList/PopperList.vue';
import BotsProfilesAddItem from '../BotsProfiles/BotsProfilesAdd.item.vue';
import BotsProfilesPinned from '../BotsProfiles/BotsProfiles.pinned.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue'; // Добавил импорт Subtitle, так как он используется в шаблоне

const emit = defineEmits<{
  (event: 'close' | 'create:successful'): void,
}>();

const useBots = useBotsStore();
const usePosts = usePostsStore();

const prompt = ref('');
const promptError = ref(''); // Состояние ошибки
const pickedBotId = ref('');
const isTaskCreateClicked = ref(false);

const disableCreate = computed(() => {
  return isTaskCreateClicked.value || !pickedProfiles.value.length;
});

const bots = computed(() => useBots.list.map((id) => useBots.get(id)) as BotsState[]);

const pickedBot = computed(() => useBots.get(pickedBotId.value));

const availableProfiles = computed(() => {
  const result: Profile[] = [];
  pickedBot.value?.profiles.forEach((profile) => {
    const idx = pickedProfiles.value.findIndex((item) => item.id === profile.id);

    if (idx === -1) {
      result.push(profile);
    }
  });

  return result;
});

const pickedProfiles = ref<Profile[]>([]);

const onPickedBotChange = (botId: string) => {
  pickedBotId.value = botId;
  pickedProfiles.value = [];
};

const onUpdateProfiles = (profile: Profile) => {
  pickedProfiles.value.push(profile);
};

const onRemoveProfile = (profile: Profile) => {
  const idx = pickedProfiles.value?.findIndex((item) => profile.id === item.id);
  // Исправил splice (раньше удалялось больше элементов чем нужно)
  if (idx !== undefined && idx !== -1) {
    pickedProfiles.value.splice(idx, 1);
  }
};

// Очистка ошибки при вводе
const handlePromptInput = (val: string) => {
  prompt.value = val;
  if (promptError.value) {
    promptError.value = '';
  }
};

// Валидация
const validate = (): boolean => {
  if (!prompt.value || prompt.value.trim().length === 0) {
    promptError.value = 'Пожалуйста, заполните описание задачи';
    return false;
  }
  return true;
};

const onTaskCreate = async () => {
  // Проверяем валидность
  if (!validate()) return;

  const profiles = pickedProfiles.value.map((profile) => profile.id);

  try {
    isTaskCreateClicked.value = true;
    const response = await usePosts.createPost({
      botId: pickedBot.value?.id || '',
      profileIds: profiles,
      taskText: prompt.value,
      platform: 'otveti',
      postType: 'opinion'
    });

    if (response) {
      emit('create:successful');
      isTaskCreateClicked.value = false;
    }
  } catch(err) {
    console.error(err);
    isTaskCreateClicked.value = false;
  }
};
</script>

<style module lang="scss">
.Row.Row {
  justify-content: end;
}

.Paragraph.Paragraph {
  font-size: 14px;
  width: 100%;
}

.IconCancel.IconCancel {
  cursor: pointer;
}

.ButtonsRow.ButtonsRow {
  justify-content: end;
}

.PickedBotWrapper.PickedBotWrapper {
  width: 100%;
}

.PickedProfilesWrapper.PickedProfilesWrapper {
  width: 100%;
}

.PickedProfiles.PickedProfiles {
  border: 1px solid var(--regular_border-background);
  padding: 7px;
  border-radius: var(--small_border-radius);
}

.ProfileRequiredText.ProfileRequiredText {
  color: var(--warning_color-orange);
}

/* Стили для ошибки */
.errorText {
  font-size: 12px;
  color: #ef4444;
  margin-top: -2px;
  font-family: var(--base_ui-sans-typography);
}

.inputErrorBorder :global(textarea) {
  border-color: #ef4444 !important;
}

/* Fallback, если Textarea это не враппер */
.inputErrorBorder {
  border-color: #ef4444 !important;
}
</style>
