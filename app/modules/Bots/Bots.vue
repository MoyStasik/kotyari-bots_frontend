<template>
  <div
    :class="$style.BotsWrapper"
  >
    <BotsSummary />
    <BotsList
      :class="$style.BotsList"
    />
  </div>
</template>

<script setup lang="ts">
import BotsList from './BotsList/Bots.list.vue';
import BotsSummary from './Bots.summary.vue';

</script>

<style module lang="scss">
.BotsWrapper.BotsWrapper {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.BotsList.BotsList {
  margin-top: 5px;
}
</style>
