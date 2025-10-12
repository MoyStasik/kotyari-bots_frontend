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
      v-if="profiles.length"
    >
      <Paragraph
        :class="$style.PinnedProfileTitle"
      >
        Прикрепленные профили:
      </Paragraph>
      <BotsProfilesPinned
        :profiles="profiles"
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
          {[$style.AvailableProfiles_MarginTop]: !profiles.length}
        ]"
      >
        Доступные профили:
      </Paragraph>
      <Column
        :gap="7"
      >
        <BotsProfilesAddItem
          v-for="item in availableProfiles"
          :key="`profile_${item.name}`"
          v-bind="item"
          @update:profiles="onAddProfile"
        />
      </Column>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { BotsCreateFormProfilesProps as Props } from './BotsCreateForm.types';
import type { Profile } from '~/store/bots/bots.types';

import { BotsProfiles } from './BotsCreateForm.constants';

import Card from '~/components/Card/Card.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';
import Column from '~/components/Column/Column.vue';
import BotsProfilesAddItem from '~/modules/BotsProfiles/BotsProfilesAdd.item.vue';
import BotsProfilesPinned from '~/modules/BotsProfiles/BotsProfiles.pinned.vue';

const props = defineProps<Props>();

const profiles = ref<Partial<Profile>[]>(props.profiles);
  const availableProfiles = ref<Partial<Profile>[]>(BotsProfiles);

const onAddProfile = (profile: Partial<Profile>) => {
  profiles.value.push(profile);
  availableProfiles.value = availableProfiles.value.filter((item) => item.name !== profile.name);
};

const onRemoveProfile = (profile: Partial<Profile>) => {
  profiles.value = profiles.value.filter((item) =>  {
    if (item.name !== profile.name) {
      return true;
    }

    availableProfiles.value.push(profile);
    return false;
  });
};
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
</style>
