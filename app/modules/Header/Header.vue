<template>
  <header
    :class="$style.Header"
  >
    <div
      :class="$style.Wrapper"
      :style="{...headerWrapperStyles}"
    >
      <Column
        :gap="4"
        :class="$style.TitleWrapper"
      >
        <Title
          :level="1"
        >
          Бот-Ферма
        </Title>
        <Subtitle
          v-if="!isMobile"
        >
          Управление аккаунтами боттов
        </Subtitle>
      </Column>
      <Row
        :class="$style.Row"
        :gap="4"
      >
        <Button
          v-for="item in headerTabs"
          :key="item.tabName"
          size="small"
          :mode="checkIsTabActive(item.route) ? 'active' : 'transparent'"
          @click="() => onButtonClick(item.route)"
        >
          <template #before>
            <component
              :is="icons[item.tabName]"
              :size="14"
              :color="checkIsTabActive(item.route) ? '#fff' : '#000'"
            />
          </template>
          <template
            v-if="!isMobile"
            #default
          >
            {{ item.tabName }}
          </template>
        </Button>
        <Avatar
          :size="28"
          :src="'/pictures/favicon.ico'"
          :class="$style.Avatar"
        />
      </Row>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

import type { Props, tabs } from './Header.types';

import { headerTabs } from './Header.conts';

import Column from '~/components/Column/Column.vue';
import Title from '~/components/Title/Title.vue';
import Row from '~/components/Row/Row.vue';
import Button from '~/components/Button/Button.vue';

defineProps<Props>();

const { isMobile } = useAdaptivity();

const LucideBot = defineAsyncComponent(() =>
  import('lucide-vue-next').then(module => module.BotIcon)
);

const LucideUser = defineAsyncComponent(() =>
  import('lucide-vue-next').then(module => module.UserIcon)
);

const LucideUsers = defineAsyncComponent(() =>
  import('lucide-vue-next').then(module => module.UsersIcon)
);

const LucideDock = defineAsyncComponent(() =>
  import('lucide-vue-next').then(module => module.DockIcon)
);

const router = useRouter();

const icons: Record<tabs, FunctionalComponent> = {
  'Боты': LucideBot,
  'Профили': LucideUsers,
  'Аккаунт': LucideUser,
  'Задачи': LucideDock,
};

const checkIsTabActive = (tabRoute: string) => {
  return tabRoute === router.currentRoute.value.path;
};

const onButtonClick = (route: string) => {
  router.push(route);
};
</script>

<style module lang="scss">
.Header.Header {
  display: flex;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: #fff;
  width: 100%;
  height: 64px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid var(--regular_border-background);
}

.Wrapper.Wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
  margin: auto;
  overflow: hidden;
}

.Row.Row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.TitleWrapper.TitleWrapper {
  width: 100%;
}

.Avatar.Avatar {
  margin-left: 2px;
}
</style>
