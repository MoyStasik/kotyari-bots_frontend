<template>
  <Column
    :gap="10"
    :class="$style.Header"
  >
    <Paragraph
      :class="$style.Paragraph"
    >
      Управление ботами
    </Paragraph>
    <div
      :class="$style.Bots"
    >
      <div
        :class="$style.InputWrapper"
      >
        <SearchInput />
      </div>
      <div>
        <Button
          :size="'medium'"
          :mode="'active'"
          :class="$style.AddBotButton"
        >
          <template #before>
            <LucidePlus
              color="#fff"
              :size="14"
            />
          </template>
          <template #default>
            Добавить
          </template>
        </Button>
      </div>
    </div>
  </Column>
</template>

<script setup lang="ts">
import Button from '~/components/Button/Button.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Column from '~/components/Column/Column.vue';
import SearchInput from '~/components/Search/SearchInput.vue';
import { LucidePlus } from 'lucide-vue-next';

</script>

<style module lang="scss">
.Header.Header {
  width: 100%;
  margin-bottom: 5px;
}

.Paragraph.Paragraph {
  font-size: 14px;
}

.Bots.Bots {
  display: flex;
  flex-direction: row;
}

.AddBotButton.AddBotButton {
  padding-inline: 10px;
}

.InputWrapper.InputWrapper {
  display: flex;
  width: 100%;
  height: 32px;
}
</style>
