<template>
  <div
    ref="taskItemsRef"
    :class="$style.TaskWrapper"
    @click="async () => await navigateTo(`/tasks/${id}`)"
  >
    <NuxtLink
    :to="`/tasks/${id}`"
    :class="$style.TaskItemLink"
  >
    <StatusPlaceholder
      :background-color="'var(--color_background_color-green)'"
      :color="'var(--status_color-green)'"
    >
      Завершена
    </StatusPlaceholder>
    <Column
      :gap="7"
      :class="$style.Column"
    >
      <Subtitle>
        {{ botName }}
      </Subtitle>
      <Paragraph>
        {{ title }}
      </Paragraph>
      <ProfileWrapper>
        {{ profileName }}
      </ProfileWrapper>
    </Column>
  </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { TaskItemProps as Props } from './Task.types';

import Column from '~/components/Column/Column.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import ProfileWrapper from '~/components/ProfileWrapper/ProfileWrapper.vue';
import type { NuxtLink } from '#components';

const props = defineProps<Props>();

const emit = defineEmits<{
  (event: 'appear', id: string): void,
}>();

const taskItemsRef = ref<ComponentPublicInstance | null>(null);

let observer: ReturnType<typeof useIntersectionObserver>;
onMounted(() => {
  observer = useIntersectionObserver(taskItemsRef,
    ([entry]) => {
      if (entry?.isIntersecting) {
        emit('appear', props.id);
        observer?.stop?.();
      }
    },
  );
});

onBeforeUnmount(() => {
  observer.stop();
});
</script>

<style module lang="scss">
.TaskWrapper.TaskWrapper {
  border: 1px solid var(--regular_border-background);
  border-radius: var(--small_border-radius);
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: var(--info-message_background-color);
  }
}

.TaskItemLink.TaskItemLink {
  text-decoration: none;
}

.Column.Column {
  margin-top: 4px;
}
</style>
