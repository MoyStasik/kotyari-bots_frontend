<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        :class="$style.ModalWrapper"
      >
        <template
          v-for="item in Object.keys(state)"
          :key="`modal_${item}`"
        >
          <component
            :is="modals[item as ModalName]"
            v-bind="state[item as ModalName]"
            :class="$style.Modal"
            @close="onClose"
          />
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { Component } from 'vue';
import type { ModalName, Props } from './ModalManager.types';

const ModalCreateBot = defineAsyncComponent(() => import('../Modals/ModalCreateBot/ModalCreateBot.vue'));

defineProps<Props>();

let state: Partial<Record<ModalName, any>> = ({});

const modals: Record<ModalName, Component> = ({
  'ModalCreateBot': ModalCreateBot,
});

const { $modal } = useNuxtApp();

const open = ref(false);

const onOpen = (name: ModalName, props: any) => {
  open.value = true;
  state[name] = props;
};

const onClose = () => {
  open.value = false;
  state = {};
};

watch(() => open.value, () => {
  if (open.value) {
    document.body.style.overflow = 'hidden';
    return;
  }

  document.body.style.overflow = '';
});

defineExpose({
  onOpen,
});

onMounted(() => {
  $modal.on('open', onOpen);
  $modal.on('close', onClose);
});

onBeforeUnmount(() => {
  $modal.off('open', onOpen);
  $modal.off('close', onClose);
});
</script>

<style module lang="scss">
.ModalWrapper.ModalWrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);

  &:global(.fade-enter-active),
  &:global(.fade-leave-active) {
    transition: opacity 0.2s ease;
  }

  &:global(.fade-enter-from),
  &:global(.fade-leave-to) {
    opacity: 0;
  }

  // другие стили TODO: вынести их
}

.Modal.Modal {
  background-color: #fff;
  padding: 20px;
  border-radius: var(--smal_border-radius);
  position: absolute;
}
</style>
