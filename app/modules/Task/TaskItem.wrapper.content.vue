<template>
  <div
    :class="$style.ContentWrapper"
  >
    <Column
      :gap="7"
    >
      <Paragraph
        :class="$style.Subtitle"
      >
        Заголовок поста:
      </Paragraph>
      <Paragraph>
      {{ post?.text }}
      </Paragraph>
    </Column>
    <Column
      :gap="7"
    >
      <Paragraph
        :class="$style.Subtitle"
      >
        Текст поста:
      </Paragraph>
      <Paragraph>
        {{ post?.title }}
      </Paragraph>
    </Column>
  </div>
  <div
    :class="$style.ButtonAfter"
  >
    <Button
      :mode="'transparent'"
      bordered
      @click="onDetailsClick"
    >
      <template #before>
        <LucideEye
          :size="14"
        />
      </template>
      Детали
    </Button>
  </div>
</template>

<script setup lang="ts">
import { LucideEye } from 'lucide-vue-next';

import type { TaskItemWrapperContentProps as Props } from './Task.types';

import { usePostsStore } from '~/store/posts/posts';

import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Column from '~/components/Column/Column.vue';

const props = defineProps<Props>();

const usePosts = usePostsStore();

const post = computed(() => usePosts.get(props.id));

const onDetailsClick = () => {

};
</script>

<style module lang="scss">
.ContentWrapper.ContentWrapper {
  display: flex;
  flex-direction: column;
  background-color: var(--info-message_background-color);
  border-radius: var(--small_border-radius);
  padding: 14px;
  gap: 14px;
}

.ButtonAfter.ButtonAfter {
  width: 100%;
  display: flex;
  justify-content: end;
}

.Subtitle.Subtitle {
  font-size: 14px;
}
</style>
