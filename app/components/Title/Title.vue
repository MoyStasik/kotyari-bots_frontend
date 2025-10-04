<template>
  <BaseTypography
    :tag="getTitleTag(level)"
    :class="[$style.Title, {
      [$style.Title_Level1]: level === 1,
      [$style.Title_Level2]: level === 2,
    }]">
    <slot/>
  </BaseTypography>
</template>

<script setup lang="ts">
import type { Props, titleLevels } from './Title.types';

import BaseTypography from '../BaseTypography/BaseTypography.vue';

withDefaults(defineProps<Props>(), {
  level: 1,
});

const getTitleTag = (level: titleLevels) => {
  return `h${level}`;
};
</script>

<style module lang="scss">
.Title.Title {
  margin: 0px;
}

.Title_Level1.Title_Level1 {
  font-size: 21px;
  line-height: 24px;
}

.Title_Level2.Title_Level2 {
  font-size: 16px;
  line-height: 18px;
}
</style>
