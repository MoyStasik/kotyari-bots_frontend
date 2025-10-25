<template>
  <!-- вынести Paragraph + Input в form field -->
  <form>
    <Column
    :gap="20"
    >
      <Column
        :gap="7"
      >
        <Paragraph>
          Название бота
        </Paragraph>
        <Input
          :value="botName"
          name="name"
          :type="'text'"
          placeholder="Торговый бот #1"
          @update:model-value="botName = $event"
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
          placeholder="Опишите роль и задачи бота..."
          @update:model-value="prompt = $event as string"
        />
      </Column>
      <Column
        :gap="14"
      >
        <Row
          :gap="7"
          items-center
        >
          <Checkbox
            :name="'moderation'"
            :value="moderationRequired"
            @checked:change="updateCurrentInfoMessage($event)"
          />
          <Paragraph>
            Требуется модерация
          </Paragraph>
        </Row>
        <InfoMessage>
          <strong>
            Режим публикации:
          </strong>
          {{ currentInfoMessage }}
        </InfoMessage>
      </Column>
      <BotsCreateFormProfiles
        :pinned-profiles="botProfiles"
        :available-profiles="profilesStore.list"
        @pin:profile="onPin"
        @unpin:profile="onUnpin"
      />
    </Column>
    <Row
      :gap="7"
      :class="$style.ButtonsRow"
    >
      <Button
        :mode="'transparent'"
        :size="'medium'"
        bordered
        @click="emit('cancel')"
      >
        Отмена
      </Button>
      <Button
        :mode="'active'"
        :size="'medium'"
        @click="onCreateBot"
      >
        {{ bot ? 'Сохранить изменения' : 'Создать бота' }}
      </Button>
    </Row>
  </form>
</template>

<script setup lang="ts">
import type { BotsCreateFormProps as Props } from './BotsCreateForm.types';
import type { Profile } from '~/store/profiles/profiles.types';

import { useBotsCreateForm } from './BotsCreate.form';
import { useBotsStore } from '~/store/bots/bots';
import { useProfilesStore } from '~/store/profiles/profiles';

import Column from '~/components/Column/Column.vue';
import Input from '~/components/Input/Input.vue';
import Row from '~/components/Row/Row.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import BotsCreateFormProfiles from './BotsCreateForm.profiles.vue';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'cancel' | 'close'): void,
}>();

const useBots = useBotsStore();
const profilesStore = useProfilesStore();

const { botName, prompt, moderationRequired, botProfiles } = useBotsCreateForm();
const currentInfoMessage = ref('Сообщения будут публиковаться автоматически');

const updateCurrentInfoMessage = (moderation: boolean) => {
  moderationRequired.value = moderation;
  if (moderation) {
    currentInfoMessage.value = 'Сообщения будут отправляться через модерацию';
    return;
  }

  currentInfoMessage.value = 'Сообщения будут публиковаться автоматически';
};

const onCreateBot = async () => {
  if (props.bot) {
    await useBots.updateBot(props.bot.id, {
      name: botName.value,
      systemPrompt: prompt.value,
      moderationRequired: moderationRequired.value,
      profiles: botProfiles.value,
    });

    emit('close');
    return;
  }

  await useBots.createBot({
    name: botName.value,
    systemPrompt: prompt.value,
    moderationRequired: moderationRequired.value,
    profiles: botProfiles.value,
  });

  emit('close');
};

const processBotState = () => {
  if (!props.bot) {
    return;
  }

  botName.value = props.bot.name;
  prompt.value = props.bot.systemPrompt;
  moderationRequired.value = props.bot.moderationRequired;
  botProfiles.value = JSON.parse(JSON.stringify(props.bot.profiles));
};

const onUnpin = (profile: Profile) => {
  const idx = botProfiles.value.findIndex((item) => item.id === profile.id);
  botProfiles.value.splice(idx, idx + 1);
};

const onPin = (profile: Profile) => {
  botProfiles.value.push(profile);
};

watch(() => props.bot, () => {
  processBotState();
}, { immediate: true, once: true });

onMounted(async () => {
  await profilesStore.getProfiles();
});
</script>

<style module lang="scss">
.ButtonsRow.ButtonsRow {
  margin-top: 20px;
  justify-content: end;
}
</style>
