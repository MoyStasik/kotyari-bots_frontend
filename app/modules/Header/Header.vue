<template>
  <header
    :class="$style.Header"
  >
    <div
      :class="$style.Wrapper"
    >
      <Column
        :gap="4"
        :class="$style.TitleWrapper"
      >
        <Title
          :level="1"
        >
          Бот-Ферма
        </Title>
        <Subtitle>
          Управление аккаунтами боттов
        </Subtitle>
      </Column>
      <Row
        :class="$style.Row"
        :gap="4"
      >
        <Button
          size="small"
          mode="transparent"
        >
          <template #before>
            <LucideBot
              :size="14"
              :class="$style.BotIcon"
            />
          </template>
          Боты
        </Button>
        <Button
          size="small"
          mode="transparent"
        >
          <template #before>
            <LucideUser
              :size="14"
            />
          </template>
          Профиль
        </Button>
        <Avatar
          :size="28"
          :src="'/pictures/favicon.ico'"
        />
      </Row>
    </div>
  </header>
</template>

<script setup lang="ts">
import { LucideBot, LucideUser } from 'lucide-vue-next';

import Column from '~/components/Column/Column.vue';
import Title from '~/components/Title/Title.vue';
import Row from '~/components/Row/Row.vue';
import Button from '~/components/Button/Button.vue';

</script>

<style module lang="scss">
.Header.Header {
  display: flex;
  width: 100%;
  height: 64px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #0000001a;
}

.Wrapper.Wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  margin-inline: 58px;
  overflow: hidden;
}

.Row.Row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.TitleWrapper.TitleWrapper {
  width: 100%;
}
</style>
