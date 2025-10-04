<template>
  <Row
    :gap="4"
    :class="$style.Row"
  >
    <Button
      :mode="'transparent'"
      :size="'small'"
      bordered
    >
      <template #before>
        <LucideSettings
          :size="14"
        />
      </template>
    </Button>
    <Button
      :mode="'transparent'"
      :size="'small'"
      bordered
    >
      Изменить
    </Button>
    <Button
      :mode="'danger'"
      :size="'small'"
      bordered
    >
      Удалить
    </Button>
  </Row>
</template>

<script setup lang="ts">
import Row from '~/components/Row/Row.vue';
import Button from '~/components/Button/Button.vue';

</script>

<style module lang="scss">
.Row.Row {
  padding-inline-end: 7px;
}
</style>
