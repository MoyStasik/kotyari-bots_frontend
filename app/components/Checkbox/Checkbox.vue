<template>
  <!-- TODO: доделать -->
  <input
    v-model="checked"
    :name="name"
    :type="'checkbox'"
    :class="$style.Checkbox"
    @change="emit('checked:change', checked)"
  />
</template>

<script setup lang="ts">
import type { Props } from './Checkbox.types';

const props = defineProps<Props>();

const checked = ref(props.value);

const emit = defineEmits<{
  (event: 'checked:change', payload: boolean): void,
}>();
</script>

<style module lang="scss">
.Checkbox.Checkbox {
  width: 14px;
  height: 14px;
  border-radius: var(--smal_border-radius);
  background-color: var(--input_background);
}
</style>
