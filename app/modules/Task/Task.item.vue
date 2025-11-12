<template>
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
</template>

<script setup lang="ts">
import type { TaskItemProps as Props } from './Task.types';

import Column from '~/components/Column/Column.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import ProfileWrapper from '~/components/ProfileWrapper/ProfileWrapper.vue';

defineProps<Props>();
</script>

<style module lang="scss">
.TaskItemLink.TaskItemLink {
  text-decoration: none;
  border: 1px solid var(--regular_border-background);
  border-radius: var(--small_border-radius);
  padding: 10px;

  &:hover {
    background-color: var(--info-message_background-color);
  }
}

.Column.Column {
  margin-top: 4px;
}
</style>
