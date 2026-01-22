<template>
  <div
    ref="containerRef"
    :class="$style.AvatarDropdown">
    <button
      ref="triggerRef"
      :class="[$style.Trigger, isOpen && $style.active]"
      @click="toggleDropdown"
    >
      <div :class="$style.AvatarContainer">
        <img
          :src="src || '/pictures/bot.jpg'"
          :alt="'user avatar'"
          :class="$style.AvatarImage"
          @error="handleImageError"
        />
        <ChevronDownIcon :class="[$style.Chevron, isOpen && $style.rotate]" />
      </div>
    </button>

    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="isOpen"
          ref="dropdownRef"
          :class="$style.Dropdown"
          :style="dropdownStyle"
        >
          <div :class="$style.DropdownContent">
            <button
              :class="$style.DropdownItem"
              @click="handleLogout"
              @mousedown.prevent
            >
              <LogOutIcon :class="$style.ItemIcon" />
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useUserStore } from '~/store/user/user';
import type { Props } from './AvatarDropdown.types';

// Иконки
const ChevronDownIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '16',
      height: '16',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      h('polyline', { points: '6 9 12 15 18 9' })
    ]);
  }
});

const LogOutIcon = defineComponent({
  render() {
    return h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '16',
      height: '16',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: '2',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    }, [
      h('path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }),
      h('polyline', { points: '16 17 21 12 16 7' }),
      h('line', { x1: '21', y1: '12', x2: '9', y2: '12' })
    ]);
  }
});

withDefaults(defineProps<Props>(), {
  src: '/pictures/bot.jpg',
  size: 28
});

const userStore = useUserStore();
const isOpen = ref(false);
const isOpenAnimate = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const containerRef = ref<HTMLElement | null>(null);

// Позиционирование dropdown
const dropdownStyle = computed(() => {
  if (!isOpen.value) return {};

  const rect = triggerRef.value?.getBoundingClientRect();
  if (!rect) {
    return;
  }
  const dropdownWidth = 220; // ширина dropdown
  const viewportWidth = window.innerWidth;

  // Рассчитываем позицию по X с учетом границ экрана
  let left = rect.left + window.scrollX;

  // Если dropdown выходит за правый край экрана
  if (left + dropdownWidth > viewportWidth) {
    left = viewportWidth - dropdownWidth - 10; // 10px отступ от края
  }

  // Если dropdown выходит за левый край экрана
  if (left < 10) {
    left = 10;
  }

  return {
    top: `${rect.bottom + window.scrollY + 5}px`,
    left: `${left}px`,
    width: `${dropdownWidth}px`
  };
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;

  // После открытия обновляем позицию
  if (isOpen.value) {
    isOpenAnimate.value = true;
    setTimeout(() => {
      isOpenAnimate.value = false;
    }, 50);
  }
};

const handleLogout = async () => {
  isOpen.value = false;

  try {
    await userStore.logoutUser();
    await navigateTo('/signup');
  } catch (err) {
    console.error(err);
  }
};

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src = '/pictures/bot.jpg';
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    !isOpenAnimate.value &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target as Node) &&
    !triggerRef.value?.contains(event.target as Node)
  ) {
    isOpen.value = false;
  }
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});
</script>

<style module lang="scss">
.AvatarDropdown {
  position: relative;
  display: inline-block;
}

.Trigger {
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--small_border-radius);
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(233, 235, 239, 0.92);
  }

  &.active {
    background-color: var(--active_button-background);
  }
}

.AvatarContainer {
  display: flex;
  align-items: center;
  gap: 8px;
}

.AvatarImage {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid var(--regular_border-background);
}

.Chevron {
  width: 16px;
  height: 16px;
  color: var(--subtitile_text-color);
  transition: transform 0.2s ease;

  &.rotate {
    transform: rotate(180deg);
  }
}

.Dropdown {
  position: fixed;
  min-width: 220px;
  background: #ffffff;
  border-radius: var(--regular_border-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--regular_border-background);
  z-index: 9999;
  overflow: hidden;
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.UserRole {
  font-size: 12px;
  color: var(--subtitile_text-color);
  margin-top: 2px;
  font-family: var(--base_ui-sans-typography);
}

.DropdownContent {
  padding: 8px;
}

.DropdownItem {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 12px;
  background: none;
  border: none;
  border-radius: var(--small_border-radius);
  cursor: pointer;
  color: var(--black_text-color);
  font-size: var(--regular_font-size);
  font-family: var(--base_ui-sans-typography);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus {
    outline: 2px solid var(--link_color);
    outline-offset: -2px;
  }
}

.ItemIcon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: currentColor;
}

// Анимации для Transition
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
