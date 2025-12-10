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

let interval: NodeJS.Timeout;

const onTaskCreated = () => {
  interval = setInterval(() => {
    onCheckTaskStatus();
  }, 5000);
};

const onCheckTaskStatus = async () => {
  try {
    const response = await usePosts.getPostsStatus();
    if (response.length) {
      notification.value?.show(true);
    }
  } catch(err){
    console.error(err);
  }
};

onMounted(() => {
  notificationBus.subscribe('task:created', onTaskCreated);
  notificationBus.emit('task:created');
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
