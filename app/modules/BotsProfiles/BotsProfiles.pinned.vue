<template>
  <div
    :class="$style.Wrapper"
  >
    <Row
      v-for="profile in profiles"
      :key="`pinned_profile_${profile.name}`"
      :gap="4"
      :class="$style.Row"
    >
      <Paragraph
        :class="$style.ProfileName"
      >
        {{ profile.name }}
      </Paragraph>
      <LucideX
        :size="14"
        :class="$style.RemoveIcon"
        @click="emit('removeProfile', profile)"
      />
    </Row>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '~/store/bots/bots.types';
import type { BotsProfilesPinnedProps as Props } from './BotsProfiles.types';

import Row from '~/components/Row/Row.vue';

defineProps<Props>();

const emit = defineEmits<{
  (event: 'removeProfile', payload: Partial<Profile>): void
}>();
</script>

<style module lang="scss">
.Wrapper.Wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.Row.Row {
  padding: 2px 7px;
  background-color: var(--info-message_background-color);
  border-radius: var(--smal_border-radius);
  align-items: center;
}

.ProfileName.ProfileName {
  font-size: 11px;
}

.RemoveIcon.RemoveIcon {
  cursor: pointer;
}
</style>
