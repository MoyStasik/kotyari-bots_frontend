<template>
  <NuxtLink
    :to="`/tasks/${id}`"
    :class="$style.TaskItemLink"
  >
    <Column
      :gap="7"
    >
      <Subtitle>
        {{ useBots.get(useBots.list[0])?.name }}
      </Subtitle>
      <Paragraph>
        {{ title }}
      </Paragraph>
      <div
      >
        <Paragraph
          :class="[$style.ProfileName, $style.ProfileWrapper]"
        >
          {{ useProfiles.get(useProfiles.list[0])?.name }}
        </Paragraph>
      </div>
    </Column>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { TaskItemProps as Props } from './Task.types';

import { useBotsStore } from '~/store/bots/bots';
import { useProfilesStore } from '~/store/profiles/profiles';

import Column from '~/components/Column/Column.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';

defineProps<Props>();

const useBots = useBotsStore();
const useProfiles = useProfilesStore();
</script>

<style module lang="scss">
.ProfileName.ProfileName {
  font-size: 11px;
}

.ProfileWrapper.ProfileWrapper {
  display: inline;
  border-radius: var(--small_border-radius);
  border: 1px solid var(--regular_border-background);
  padding: 2px 7px;
}

.TaskItemLink.TaskItemLink {
  text-decoration: none;
  border: 1px solid var(--regular_border-background);
  border-radius: var(--small_border-radius);
  padding: 10px;

  &:hover {
    background-color: var(--info-message_background-color);
  }
}
</style>
