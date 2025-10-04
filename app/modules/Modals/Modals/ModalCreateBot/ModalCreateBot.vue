<template>
  <div
    :class="$style.FirstModal"
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
        @cancel="emit('close')"
      />
    </Column>
  </div>
</template>

<script setup lang="ts">
import Title from '~/components/Title/Title.vue';
import ModalHeader from '../ModalHeader/ModalHeader.vue';
import Column from '~/components/Column/Column.vue';
import BotsCreateForm from '~/modules/Bots/BotsCreateForm/BotsCreateForm.vue';
import type { Props } from './ModalCreateBot.types';

defineProps<Props>();

const emit = defineEmits<{
  (event: 'close'): void,
}>();
</script>

<style module lang="scss">
.FirstModal.FirstModal {
  width: 405px;
}
</style>
