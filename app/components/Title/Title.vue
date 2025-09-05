<template>
  <BaseTypography
    :tag="getTitleTag(level)"
    :class="[$style.Title, {
      [$style.Title_Level1]: true},
    ]">
    <slot></slot>
  </BaseTypography>
</template>

<script setup lang="ts">
import type { Props, titleLevels } from './Title.types';

import BaseTypography from '../BaseTypography/BaseTypography.vue';

const props = withDefaults(defineProps<Props>(), {
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
</style>
