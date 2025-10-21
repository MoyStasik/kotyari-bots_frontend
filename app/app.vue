<template>
  <div id="root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ModalManager />
  </div>
</template>

<script setup lang="ts">
import ModalManager from './modules/Modals/ModalManager/ModalManager.vue';

</script>

<style style lang="scss">
#root {
  display: flex;
  width: 100%;
}
</style>
