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
          {{ bot ? 'Редактировать бота' : 'Создать нового бота' }}
        </Title>
      </ModalHeader>
      <BotsCreateForm
        :bot="bot"
        @cancel="emit('close')"
        @close="emit('close')"
      />
    </Column>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './ModalCreateBot.types';

import { useBotsStore } from '~/store/bots/bots';

import Title from '~/components/Title/Title.vue';
import ModalHeader from '../ModalHeader/ModalHeader.vue';
import Column from '~/components/Column/Column.vue';
import BotsCreateForm from '~/modules/Bots/BotsCreateForm/BotsCreate.form.vue';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'close'): void,
}>();

const useBots = useBotsStore();

const bot = computed(() => useBots.get(props?.botId || ''));
</script>

<style module lang="scss">
.Modal.Modal {
  width: 405px;
}
</style>
