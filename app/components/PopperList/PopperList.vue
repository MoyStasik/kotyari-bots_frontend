<template>
  <div>
    <select
      id="bot"
      v-model="selectedBotId"
      @change="onBotChange"
    >
      <option
        v-for="bot in bots"
        :key="bot.id"
        :value="bot.id"
      >
        {{ bot.name + ` (${bot.profilesCount} профилей)` }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { Props } from './PopperList.types';

defineProps<Props>();

const emit = defineEmits<{
  (event: 'bot-change', botId: string): void
}>();

const selectedBotId = ref('');

const onBotChange = () => {
  emit('bot-change', selectedBotId.value);
};
</script>

<style module lang="scss">
.badge {
  display: inline-flex;
}
.space-y-2 > * + * {
  margin-top: 0.5rem;
}
</style>
