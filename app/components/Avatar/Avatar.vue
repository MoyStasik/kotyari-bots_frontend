<template>
  <div
    :style="{
      width: withPX(size),
      height: withPX(size),
    }"
    :class="$style.AvatarWrapper"
  >
    <img
      :src="src"
      alt="fav_icon"
      :width="withPX(size)"
      :height="withPX(size)"
      :class="$style.Avatar"
    />
  </div>
</template>

<script setup lang="ts">
import type { Props } from './Avatar.types';

import { withPX } from '~/utils/utils';

withDefaults(defineProps<Props>(), {
  size: 16,
});
</script>

<style module lang="scss">
.AvatarWrapper.AvatarWrapper {
  box-sizing: border-box;
  border-radius: 100%;
  overflow: hidden;
  border: 1px solid #0000001a;
}

.Avatar.Avatar {
  border-radius: 100%;
}
</style>
