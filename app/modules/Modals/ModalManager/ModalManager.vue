<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        :class="$style.ModalWrapper"
      >
        <ModalCreateBot
          :class="$style.Modal"
          @close="onClose"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import ModalCreateBot from '../Modals/ModalCreateBot/ModalCreateBot.vue';

const open = ref(false);

const onOpen = () => {
  open.value = true;
};

const onClose = () => {
  open.value = false;
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
  border-radius: 8px;
  position: absolute;
}
</style>
