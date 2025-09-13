<template>
  <div
    :class="$style.BotsListWrapper"
  >
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
    <BotsTable />
  </div>
</template>

<script setup lang="ts">
import { LucidePlus } from 'lucide-vue-next';

import BotsTable from './Bots.table.vue';
import SearchInput from '~/components/Search/SearchInput.vue';

</script>

<style module lang="scss">
.BotsListWrapper.BotsListWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 25px;
  border-radius: var(--regular_border-radius);
  border: 1px solid var(--regular_border-background);
  padding: 20px;
}

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
}
</style>
