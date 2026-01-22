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
      v-if="!isMobile"
      :class="$style.Bots"
    >
      <div
        :class="$style.InputWrapper"
      >
        <SearchInput
          :value="searchValue"
          :class="$style.SearchInput"
          @update:model-value="searchValue = $event"
        />
      </div>
      <div>
        <Button
          :size="'medium'"
          :mode="'active'"
          :class="$style.AddBotButton"
          @click="emit('click:add')"
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
    <div
      v-else
      :class="$style.Bots_Mobile"
    >
      <div>
        <Button
          :size="'medium'"
          :mode="'active'"
          :class="$style.AddBotButton"
          @click="emit('click:add')"
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
      <div
        :class="$style.InputWrapper"
      >
        <SearchInput
          :value="searchValue"
          :class="$style.SearchInput"
          @update:model-value="searchValue = $event"
        />
      </div>
    </div>
  </Column>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { LucidePlus } from 'lucide-vue-next';

import Button from '~/components/Button/Button.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Column from '~/components/Column/Column.vue';
import SearchInput from '~/components/Search/SearchInput.vue';

const emit = defineEmits<{
  (event: 'click:add'): void,
  (event: 'search', value: string): void, // Добавили эмит поиска
}>();

const { isMobile } = useAdaptivity();

const searchValue = ref<string>('');

// Следим за изменением инпута и отправляем наверх
watch(searchValue, (val) => {
  emit('search', val);
});
</script>

<style module lang="scss">
/* Стили остаются без изменений */
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

.Bots_Mobile.Bots_Mobile {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.AddBotButton.AddBotButton {
  padding-inline: 10px;
}

.InputWrapper.InputWrapper {
  display: flex;
  width: 100%;
  height: 32px;
}

.SearchInput.SearchInput {
  max-width: 330px;
}
</style>
