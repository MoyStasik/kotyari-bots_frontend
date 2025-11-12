<template>
  <div
    :class="$style.Wrapper"
  >
    <template
      v-for="post in posts"
      :key="`post_${post?.id}`"
    >
      <TaskItem
        v-if="post"
        v-bind="post"
        :gap="7"
        :class="$style.PostWrapper"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/store/posts/posts';

import TaskItem from '~/modules/Task/Task.item.vue';
import type { PostsState } from '~/store/posts/posts.types';

const usePosts = usePostsStore();

const posts = computed(() => usePosts.list.map((id) => usePosts.get(id)) as PostsState[]);

const onLoad = async () => {
  usePosts.list = [];
  usePosts.posts = [];
  await usePosts.getPosts();
};

onMounted(async () => {
  await onLoad();
});
</script>

<style module lang="scss">
.Wrapper.Wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
