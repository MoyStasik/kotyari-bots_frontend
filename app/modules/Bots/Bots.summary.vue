<template>
  <div
    :class="$style.BotsSummary"
  >
    <Card
      v-for="item in count"
      :key="item"
      :min-width="cardWidth"
    />
  </div>
</template>

<script setup lang="ts">
import Card from '~/components/Card/Card.vue';

withDefaults(defineProps<{ count?: number }>(), {
  count: 5,
});

const { isDesktop, isTablet } = useAdaptivity();

// TODO подумать над resize observer
const cardWidth = computed(() => {
  if (isDesktop.value) {
    return (1130 - 4 * 15) / 5; // 5 карточек в строке если Desktop
  }

  if (isTablet.value) {
    return (698 - 2 * 15) / 3; // 3 карточки в строке если Tablet
  }

  return '100%'; //
});
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
