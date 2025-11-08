<template>
  <div
    :class="$style.InfoMessage"
  >
    <Paragraph
      :class="$style.Paragraph"
    >
      <slot />
    </Paragraph>
  </div>
</template>

<script setup lang="ts">
import Paragraph from '../Paragraph/Paragraph.vue';

</script>

<style module lang="scss">
.InfoMessage.InfoMessage {
  border-radius: var(--small_border-radius);
  padding: 10px;
  background-color: var(--info-message_background-color);
}

.Paragraph.Paragraph {
  color: var(--subtitile_text-color);
}
</style>
