<template>
  <div
    :class="$style.Wrapper"
  >
    <Column
      v-for="post in posts"
      :key="`post_${post?.id}`"
      :gap="7"
      :class="$style.PostWrapper"
    >
      <Subtitle>
        {{ useBots.get(useBots.list[0])?.name }}
      </Subtitle>
      <Paragraph>
        {{ post?.title }}
      </Paragraph>
      <div
      >
        <Paragraph
          :class="[$style.ProfileName, $style.ProfileWrapper]"
        >
          Экономист
        </Paragraph>
      </div>
    </Column>
  </div>
</template>

<script setup lang="ts">
import { useBotsStore } from '~/store/bots/bots';
import { usePostsStore } from '~/store/posts/posts';

import Column from '~/components/Column/Column.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';

const usePosts = usePostsStore();
const useBots = useBotsStore();

const posts = computed(() => usePosts.list.map((id) => usePosts.get(id)));

onMounted(async () => {
  await usePosts.getPosts();
});
</script>

<style module lang="scss">
.Wrapper.Wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.PostWrapper.PostWrapper {
  display: flex;
  width: 100%;
  padding: 10px;
  border: 1px solid var(--regular_border-background);
  border-radius: var(--small_border-radius);
}

.ProfileName.ProfileName {
  font-size: 11px;
}

.ProfileWrapper.ProfileWrapper {
  display: inline;
  border-radius: var(--small_border-radius);
  border: 1px solid var(--regular_border-background);
  padding: 2px 7px;
}
</style>
