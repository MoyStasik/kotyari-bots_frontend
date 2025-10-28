<template>
  <form>
    <Column
    :gap="20"
    >
      <Column
        :gap="7"
      >
        <Paragraph>
          Название профиля
        </Paragraph>
        <Input
          :value="''"
          name="name"
          :type="'text'"
          placeholder="Продавец консультант"
        />
      </Column>
      <Column
        :gap="7"
      >
        <Paragraph>
          Системный промпт
        </Paragraph>
        <Textarea
          :value="''"
          placeholder="Опишите роль и задачи профиля..."
        />
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
      >
        Отмена
      </Button>
      <Button
        :mode="'active'"
        :size="'medium'"
      >
        {{ profile ? 'Сохранить изменения' : 'Создать профиль' }}
      </Button>
    </Row>
  </form>
</template>

<script setup lang="ts">
import type { Props } from './ProfilesCreateForm.types';

import Column from '~/components/Column/Column.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Input from '~/components/Input/Input.vue';
import Textarea from '~/components/Textarea/Textarea.vue';
import Row from '~/components/Row/Row.vue';
import Button from '~/components/Button/Button.vue';

defineProps<Props>();
</script>

<style module lang="scss">
.ButtonsRow.ButtonsRow {
  margin-top: 20px;
  justify-content: end;
}
</style>
