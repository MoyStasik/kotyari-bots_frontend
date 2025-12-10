<template>
  <Column
    :gap="7"
  >
    <ProfileWrapper>
      {{ profileName }}
    </ProfileWrapper>
    <Title
      :level="2"
      :class="$style.TaskTitle"
    >
      {{ `Задача: ${taskTitle}` }}
    </Title>
  </Column>
</template>

<script setup lang="ts">
import type { TaskItemWrapperHeaderProps as Props } from './Task.types';

import ProfileWrapper from '~/components/ProfileWrapper/ProfileWrapper.vue';
import Title from '~/components/Title/Title.vue';
import Column from '~/components/Column/Column.vue';

defineProps<Props>();
</script>

<style module lang="scss">
.TaskTitle.TaskTitle {
  color: var(--subtitile_text-color);
  font-weight: 400;
}
</style>
