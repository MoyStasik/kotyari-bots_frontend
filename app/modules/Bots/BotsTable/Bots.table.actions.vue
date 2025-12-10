<template>
  <Row
    :gap="4"
    :class="$style.Row"
  >
    <Button
      :mode="'transparent'"
      :size="'small'"
      bordered
      @click="onBotEdit"
    >
      <template #before>
        <LucideSettings
          :size="14"
        />
      </template>
      Изменить
    </Button>
    <Button
      :mode="'danger'"
      :size="'small'"
      bordered
      @click="onBotDelete"
    >
      Удалить
    </Button>
  </Row>
</template>

<script setup lang="ts">
import Row from '~/components/Row/Row.vue';
import Button from '~/components/Button/Button.vue';

const emit = defineEmits<{
  (event: 'bot-edit' | 'bot-delete'): void,
}>();

const onBotEdit = () => {
  emit('bot-edit');
};

const onBotDelete = () => {
  emit('bot-delete');
};
</script>

<style module lang="scss">
.Row.Row {
  padding-inline-end: 7px;
}
</style>
