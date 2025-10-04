<template>
  <!-- вынести в Paragraph + Input в form field -->
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
          name="name"
          :type="'text'"
          placeholder="Торговый бот #1"
        />
      </Column>
      <Column
        :gap="7"
      >
        <Paragraph>
          Системный промпт
        </Paragraph>
        <Textarea
          placeholder="Опишите роль и задачи бота..."
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
      <Card>
        <template #header>
          <Paragraph
            :class="$style.ProfilesTitle"
          >
            Профили бота
          </Paragraph>
        </template>
        <Paragraph
          :class="$style.AvailableProfiles"
        >
          Доступные профили:
        </Paragraph>
        <Column
          :gap="7"
        >
          <BotsCreateFormProfiles />
        </Column>
      </Card>
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
        Создать бота
      </Button>
    </Row>
  </form>
</template>

<script setup lang="ts">
import Column from '~/components/Column/Column.vue';
import Input from '~/components/Input/Input.vue';
import Row from '~/components/Row/Row.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Card from '~/components/Card/Card.vue';
import BotsCreateFormProfiles from './BotsCreateForm.profiles.vue';

const emit = defineEmits<{
  (event: 'cancel'): void,
}>();

const currentInfoMessage = ref('Сообщения будут публиковаться автоматически');

const updateCurrentInfoMessage = (moderationRequired: boolean) => {
  if (moderationRequired) {
    currentInfoMessage.value = 'Сообщения будут отправляться через модерацию';
    return;
  }

  currentInfoMessage.value = 'Сообщения будут публиковаться автоматически';
};

const onCreateBot = () => {

};
</script>

<style module lang="scss">
.ProfilesTitle.ProfilesTitle {
  font-size: 14px;
}

.AvailableProfiles.AvailableProfiles {
  margin-top: 20px;
  margin-bottom: 7px;
}

.ButtonsRow.ButtonsRow {
  margin-top: 20px;
  justify-content: end;
}
</style>
