<template>
  <div>
    <Paragraph
      :class="[$style.ProfileName, $style.ProfileWrapper]"
    >
      <slot />
    </Paragraph>
  </div>
</template>

<script setup lang="ts">
</script>

<style module lang="scss">
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
