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
      Удалить бота?
    </Title>
    <Subtitle
      :class="$style.Text"
    >
      Вы действительно хотите удалить бота <strong>{{ bot?.name }}</strong> Это действие нельзя будет отменить. Все связанные с ботом данные будут удалены безвозвратно.
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
        @click="onDeleteBot"
      >
        Удалить
      </Button>
    </div>
  </Column>
</template>

<script setup lang="ts">
import type { Props } from './ModalDeleteBot.types';

import { useBotsStore } from '~/store/bots/bots';

import Column from '~/components/Column/Column.vue';
import Title from '~/components/Title/Title.vue';
import Button from '~/components/Button/Button.vue';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'close'): void,
}>();

const { isMobile } = useAdaptivity();

const botsStore = useBotsStore();

const bot = computed(() => botsStore.get(props.botId));

const onDeleteBot = async () => {
  await botsStore.deleteBot(props.botId);
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
