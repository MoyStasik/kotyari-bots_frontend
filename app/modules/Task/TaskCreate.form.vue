<template>
  <form>
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
        <Textarea
          :placeholder="'Опишите, что должен сделать бот...'"
          :value="prompt"
          :min-height="56"
          @update:model-value="prompt = $event as string"
        />
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
          @click="onTaskCreate"
        >
          Создать задачу
        </Button>
      </Row>
    </Column>
  </form>
</template>

<script setup lang="ts">
import { LucideZap, LucideX } from 'lucide-vue-next';

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

const emit = defineEmits<{
  (event: 'close'): void,
}>();

const useBots = useBotsStore();
const usePosts = usePostsStore();

const prompt = ref('');

const pickedBotId = ref('');

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
  availableProfiles.value.push(profile);
  pickedProfiles.value.splice(idx, idx + 1);
};

const onTaskCreate = async () => {
  const profiles = pickedProfiles.value.map((profile) => profile.id);

  const response = await usePosts.createPost({ botId: pickedBot.value?.id || '', profileIds: profiles, taskText: prompt.value, platform: 'otveti', postType: 'opinion' });

  if (response) {
    emit('close');
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
</style>
