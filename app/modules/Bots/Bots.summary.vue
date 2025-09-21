<template>
  <div
    :class="$style.BotsSummary"
  >
    <Card
      v-for="item in count"
      :key="item"
      :max-width="maxCardWidth"
    />
  </div>
</template>

<script setup lang="ts">
import Card from '~/components/Card/Card.vue';

withDefaults(defineProps<{ count?: number }>(), {
  count: 5,
});

const { isDesktop, isTablet } = useAdaptivity();

const maxCardWidth = computed(() => {
  if (isDesktop.value) {
    return 1160;
  }

  if (isTablet.value) {
    return 728;
  }

  return undefined;
});

// '1160px', '728px',
</script>

<style module lang="scss">
.BotsSummary.BotsSummary {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 15px;
  flex-direction: row;
  margin-bottom: 15px;
}
</style>
