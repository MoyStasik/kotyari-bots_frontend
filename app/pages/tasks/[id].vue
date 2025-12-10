<template>
  <TaskItemWrapper
    :id="id || ''"
  />
</template>

<script setup lang="ts">
import TaskItemWrapper from '~/modules/Task/TaskItem.wrapper.vue';

const router = useRouter();

const id = computed(() => {
  const id = router.currentRoute.value.params.id;
  return Array.isArray(id) ? id[0] : id;
});
</script>

<style module lang="scss">
</style>
