<template>
  <TaskItemWrapper
    :id="id || ''"
  />
</template>

<script setup lang="ts">
import TaskItemWrapper from '~/modules/Task/TaskItem.wrapper.vue';
import { usePostsStore } from '~/store/posts/posts';

const router = useRouter();

const postsStore = usePostsStore();

const id = computed(() => {
  const id = router.currentRoute.value.params.id;
  return Array.isArray(id) ? id[0] : id;
});

onMounted(async () => {
  if (!id.value) {
    return;
  }

  await postsStore.createPostSeen({ seen: [id.value] });
});
</script>

<style module lang="scss">
</style>
