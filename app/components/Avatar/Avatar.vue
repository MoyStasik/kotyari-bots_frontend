<template>
  <img
    :src="src"
    alt="fav_icon"
    :width="withPX(size)"
    :height="withPX(size)"
    :class="$style.Avatar"
  />
</template>

<script setup lang="ts">
import type { Props } from './Avatar.types';

import { withPX } from '~/utils/utils';

withDefaults(defineProps<Props>(), {
  size: 16,
});
</script>

<style module lang="scss">
.Avatar.Avatar {
  border-radius: 100%;
}
</style>
