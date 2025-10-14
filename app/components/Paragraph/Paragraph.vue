<template>
  <BaseTypography
    :class="$style.Paragraph"
  >
    <slot/>
  </BaseTypography>
</template>

<script setup lang="ts">

</script>

<style module lang="scss">
.Paragraph.Paragraph {
  font-size: 13px;
  line-height: 18px;
}
</style>
