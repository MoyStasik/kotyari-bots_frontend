<template>
  <div
    :class="$style.BotsWrapper"
  >
    <Card
      v-for="item in 5"
      :key="item"
    />
    <BotsList
      :class="$style.BotsList"
    />
  </div>
</template>

<script setup lang="ts">
import Card from '~/components/Card/Card.vue';
import BotsList from './Bots.list.vue';

</script>

<style module lang="scss">
.BotsWrapper.BotsWrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 15px
}

.BotsList.BotsList {
  margin-top: 5px;
}
</style>
