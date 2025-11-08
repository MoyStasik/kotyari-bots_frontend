<template>
  <div
    :class="$style.HeaderWrapper"
  >
    <Column
      :gap="4"
      :class="$style.InfoWrapper"
    >
      <Paragraph
        :class="$style.Text"
      >
        Профили ботов
      </Paragraph>
      <Subtitle>
        Профили определяют роли и поведение ботов
      </Subtitle>
    </Column>
    <div
      :class="$style.ButtonWrapper"
    >
      <Button
        :mode="'active'"
        @click="$modal.open('ModalCreateProfile', {})"
      >
        <template #before>
          <LucidePlus
            color="#fff"
            :size="14"
          />
        </template>
        Добавить
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LucidePlus } from 'lucide-vue-next';

import Column from '~/components/Column/Column.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue';

const { $modal } = useNuxtApp();
</script>

<style module lang="scss">
.HeaderWrapper.HeaderWrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.InfoWrapper.InfoWrapper {
  width: 100%;
}

.Text.Text {
  font-size: 14px;
}

.ButtonWrapper.ButtonWrapper {
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>
