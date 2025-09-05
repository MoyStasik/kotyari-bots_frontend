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
        <button>
          Боты
        </button>
        <button>
          Профиль
        </button>
        <Avatar
          :size="24"
          :src="'/pictures/favicon.ico'"
        />
      </Row>
    </div>
  </header>
</template>

<script setup lang="ts">
import Column from '~/components/Column/Column.vue';
import Title from '~/components/Title/Title.vue';
import Row from '~/components/Row/Row.vue';

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
