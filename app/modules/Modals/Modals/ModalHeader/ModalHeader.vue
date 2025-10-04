<template>
  <Row>
    <div
      :class="$style.ContentWrapper"
    >
      <slot />
    </div>
    <div
      :class="$style.CancelWrapper"
      @click="emit('close')"
    >
      <LucideX
        :size="14"
      />
    </div>
  </Row>
</template>

<script setup lang="ts">
import { LucideX } from 'lucide-vue-next';

import Row from '~/components/Row/Row.vue';

const emit = defineEmits<{
  (event: 'close'): void,
}>();
</script>

<style module lang="scss">
.ContentWrapper.ContentWrapper {
  display: flex;
  width: 100%;
}

.CancelWrapper.CancelWrapper {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
}
</style>
