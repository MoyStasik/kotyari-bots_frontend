<template>
  <Transition
    name="notification"
  >
    <div
      v-if="isVisible"
      :class="$style.Notification"
    >
      <div :class="$style.NotificationContent">
        <div :class="$style.NotificationIcon">✓</div>
        <div :class="$style.NotificationText">
          <Paragraph>
            {{ notificationText }}
          </Paragraph>
          <NuxtLink
            v-if="ready"
            :to="'/tasks'"
            :class="$style.Link"
          >
            <Paragraph
              :class="$style.Link"
            >
              Перейти на страницу задач
            </Paragraph>
          </NuxtLink>
        </div>
      </div>
      <div :class="$style.NotificationProgress"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Paragraph from '~/components/Paragraph/Paragraph.vue';

const isVisible = ref(false);
let timeoutId: NodeJS.Timeout | null = null;

const notificationText = ref('Задача успешно создана, подождите немного времени и она будет отображена на странице задач');
const ready = ref(false);

const show = (taskReady?: boolean) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    isVisible.value = false;
  }

  // Даем время для сброса состояния перед показом
  setTimeout(() => {
    isVisible.value = true;
    ready.value = !!taskReady;

    if (taskReady) {
      notificationText.value = 'Задача успешно выполнена';
    }
    else {
      notificationText.value = 'Задача успешно создана, подождите немного времени и она будет отображена на странице задач';
    }

    timeoutId = setTimeout(() => {
      isVisible.value = false;
      timeoutId = null;
    }, 5000);
  }, 50);
};

// Экспортируем метод show для использования извне
defineExpose({
  show
});

onUnmounted(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
});
</script>

<style module lang="scss">
.Notification {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  max-width: 400px;
  z-index: 1000;
}

.NotificationContent {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.NotificationIcon {
  background: #10b981;
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  flex-shrink: 0;
}

.NotificationText {
  color: #374151;
  font-size: 14px;
  line-height: 1.4;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.NotificationProgress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: #10b981;
  border-radius: 0 0 0 8px;
  animation: progress 4s linear;
}

.Link.Link {
  text-decoration: none;
  color: var(--link_color);

  &:hover {
    text-decoration: underline;
  }
}

/* Анимации для Transition - должны быть в глобальных стилях */
</style>

<style lang="scss">
/* Глобальные стили для Transition */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease-in-out;
}

.notification-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.notification-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.notification-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.notification-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes progress {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}
</style>
