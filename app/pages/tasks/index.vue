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
        @appear="onTaskAppear"
      />
    </template>
    <div
      v-if="!posts.length"
      :class="$style.EmptyPosts"
    >
      <Paragraph
        :class="$style.EmptyText"
      >
        Пока нет постов
      </Paragraph>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~/store/posts/posts';

import TaskItem from '~/modules/Task/Task.item.vue';
import type { PostsState } from '~/store/posts/posts.types';

const postsStore = usePostsStore();

const posts = computed(() => postsStore.list.map((id) => postsStore.get(id)) as PostsState[]);

const seen = ref<string[]>([]);

const debouncedTaskSeen = debounce(async () => await onTaskSeen(), 200);

const onLoad = async () => {
  postsStore.list = [];
  postsStore.posts = [];
  await postsStore.getPosts();
};

const onTaskAppear = async (id: string) => {
  seen.value.push(id);
  debouncedTaskSeen();
};

const onTaskSeen = async () => {
  seen.value.forEach((taskId) => {
    postsStore.shownPosts.delete(taskId);
  });

  await postsStore.createPostSeen({ seen: seen.value });
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

.EmptyPosts.EmptyPosts {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 104px);
  opacity: 0.8;
}

.EmptyText.EmptyText {
  font-size: 30px;
}
</style>
