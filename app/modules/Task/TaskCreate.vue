<template>
  <Card
    :dashed="!taskCreateFormShow"
    :class="$style.Card"
  >
    <div
      v-if="!taskCreateFormShow"
      :class="$style.CreateTask"
      @click="onCreateTaskToogle"
    >
      <LucideZap
        :size="14"
      />
      <Subtitle
        :class="$style.Subtitle"
      >
        Быстро создать задачу
      </Subtitle>
    </div>
    <TaskCreateForm
      v-else
      @close="onCreateTaskClose"
      @create:successful="onTaskCreated"
    />
  </Card>
  <Notification
    ref="notification"
  />
</template>

<script setup lang="ts">
import { LucideZap } from 'lucide-vue-next';

import Card from '~/components/Card/Card.vue';
import Subtitle from '~/components/Subtitle/Subtitle.vue';
import TaskCreateForm from './TaskCreate.form.vue';
import Notification from '../Notification/Notification.vue';
import { useNotificationBus } from '~/constants/notification.bus';

const notification = ref<InstanceType<typeof Notification> | null>(null);
const taskCreateFormShow = ref(false);

const notificationBus = useNotificationBus;

const onCreateTaskToogle = () => {
  taskCreateFormShow.value = !taskCreateFormShow.value;
};

const onCreateTaskClose = () => {
  taskCreateFormShow.value = false;
};

const onTaskCreated = (groupID: string) => {
  onCreateTaskClose();
  notification.value?.show();
  notificationBus.emit('task:created', groupID);
};
</script>

<style module lang="scss">
.Card.Card {
  padding: 20px;
}

.CreateTask.CreateTask {
  height: 56px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: var(--regular_border-radius);
  gap: 8px;

  &:hover {
    background-color: var(--info-message_background-color);

    .Subtitle {
      color: var(--black_text-color);
    }
  }
}
</style>
