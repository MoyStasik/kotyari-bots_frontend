<template>
  <Card>
    <template #header>
      <Paragraph
        :class="$style.ProfilesTitle"
      >
        Профили бота
      </Paragraph>
    </template>
    <template
      v-if="pinnedProfiles.length"
    >
      <Paragraph
        :class="$style.PinnedProfileTitle"
      >
        Прикрепленные профили:
      </Paragraph>
      <BotsProfilesPinned
        :profiles="pinnedProfiles"
        :class="{
          [$style.PinnedProfiles]: availableProfiles.length
        }"
        @remove-profile="onRemoveProfile"
      />
    </template>
    <template
      v-if="availableProfiles.length"
    >
      <Paragraph
        :class="[
          $style.AvailableProfiles,
          {[$style.AvailableProfiles_MarginTop]: !pinnedProfiles.length}
        ]"
      >
        Доступные профили:
      </Paragraph>
      <Column
        :gap="7"
        :class="$style.ProfilesList"
      >
        <BotsProfilesAddItem
          v-for="(item, idx) in availableProfiles"
          :key="`bot_profile_${idx}`"
          :profile="item"
          @update:profiles="onAddProfile"
        />
      </Column>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { BotsCreateFormProfilesProps as Props } from './BotsCreateForm.types';
import type { Profile } from '~/store/profiles/profiles.types';

import { useProfilesStore } from '~/store/profiles/profiles';

import Card from '~/components/Card/Card.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Column from '~/components/Column/Column.vue';
import BotsProfilesAddItem from '~/modules/BotsProfiles/BotsProfilesAdd.item.vue';
import BotsProfilesPinned from '~/modules/BotsProfiles/BotsProfiles.pinned.vue';

const props = defineProps<Props>();

const profilesStore = useProfilesStore();

const pinnedProfiles = computed(() => props.pinnedProfiles);
const availableProfiles = computed(() => {
  const result: Profile[] = [];
  const pinnedProfilesIds = new Set(pinnedProfiles.value.map((item) => item.id));

  props.availableProfiles.forEach((id) => {
    if (pinnedProfilesIds.has(id)) {
      return;
    }

    result.push(profilesStore.get(id) as Profile);
  });

  return result;
});

const onAddProfile = (profile: Profile) => {
  emit('pin:profile', profile);
  const idx = availableProfiles.value.findIndex((item) => profile?.id === item?.id);
  availableProfiles.value.splice(idx, idx + 1);
};

const onRemoveProfile = (profile: Profile) => {
  emit('unpin:profile', profile);
};

const emit = defineEmits<{
  (event: 'pin:profile' | 'unpin:profile', payload: Profile): void,
}>();
</script>

<style module lang="scss">
.ProfilesTitle.ProfilesTitle {
  font-size: 14px;
}

.PinnedProfileTitle.PinnedProfileTitle {
  margin-top: 20px;
}

.AvailableProfiles.AvailableProfiles {
  margin-bottom: 7px;
}

.AvailableProfiles_MarginTop.AvailableProfiles_MarginTop {
  margin-top: 20px;
}

.PinnedProfiles.PinnedProfiles {
  margin-bottom: 14px;
}

.ProfilesList.ProfilesList {
  max-height: 175px;
  overflow: scroll;
}
</style>
