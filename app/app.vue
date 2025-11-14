<template>
  <div id="root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ModalManager />
    <Notification
      ref="notification"
    />
  </div>
</template>

<script setup lang="ts">
import { useNotificationBus } from './constants/notification.bus';
import { usePostsStore } from './store/posts/posts';

import ModalManager from './modules/Modals/ModalManager/ModalManager.vue';
import Notification from './modules/Notification/Notification.vue';

const usePosts = usePostsStore();

const notificationBus = useNotificationBus;

const notification = ref<InstanceType<typeof Notification> | null>(null);
const groupIds = ref<string[]>([]);

let interval: NodeJS.Timeout;

const onTaskCreated = (groupID: string) => {
  groupIds.value.push(groupID);
  interval = setInterval(() => {
    onCheckTaskStatus(groupID);
  }, 5000);
};

const onCheckTaskStatus = async (groupID: string) => {
  try {
    const response = await usePosts.getPostsStatus(groupID);
    if (response.data.length) {
      notification.value?.show(true);
      clearInterval(interval);
    }
  } catch(err){
    console.error(err);
  }
};

onMounted(() => {
  notificationBus.subscribe('task:created', onTaskCreated);
});

onBeforeUnmount(() => {
  notificationBus.unsubscribe('task:created', onTaskCreated);
  clearInterval(interval);
});
</script>

<style style lang="scss">
#root {
  display: flex;
  width: 100%;
}
</style>
