<template>
  <Row
    :class="$style.BotsItemWrapper"
    :gap="50"
    items-center
  >
    <Paragraph>
      {{ 'Имя' }}
    </Paragraph>
    <Paragraph>
      {{ 'Профилей' }}
    </Paragraph>
    <Paragraph>
      {{ 'Статус' }}
    </Paragraph>
    <Paragraph>
      {{ 'Создан' }}
    </Paragraph>
  </Row>
</template>

<script setup lang="ts">
import Row from '~/components/Row/Row.vue';
import Paragraph from '~/components/Paragraph/Paragraph.vue';

</script>

<style module lang="scss">
.BotsItemWrapper.BotsItemWrapper {
  width: 100%;
  height: 35px;
  padding-inline-start: 7px;
  border-bottom: 1px solid var(--regular_border-background);
}
</style>
