<template>
  <div
    :class="$style.PostWrapper"
  >
    <TaskItemWrapperHeader
      :profile-name="post?.profileName || ''"
      :task-title="post?.title || ''"
    />
    <TaskItemWrapperContent
      :id="id"
    />
  </div>
</template>

<script setup lang="ts">
import type { TaskItemWrapperProps as Props } from './Task.types';

import { usePostsStore } from '~/store/posts/posts';
import TaskItemWrapperHeader from './TaskItem.wrapper.header.vue';
import TaskItemWrapperContent from './TaskItem.wrapper.content.vue';

const props = defineProps<Props>();

const usePosts = usePostsStore();

const isLoaded = useState(`post_${props.id}`, () => false);

const post = computed(() => usePosts.get(props.id));

const load = async () => {
  if (isLoaded.value) {
    return;
  }

  isLoaded.value = true;
  try {
    await usePosts.getPost(props.id);
  } catch(err) {
    console.error(err);
  }
};

onMounted(async () => {
  await load();
});

onServerPrefetch(async () => {
  await load();
});
</script>

<style module lang="scss">
.PostWrapper.PostWrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 14px;
  border-radius: var(--regular_border-radius);
  border: 1px solid var(--regular_border-background);
  padding: 20px;
}
</style>
