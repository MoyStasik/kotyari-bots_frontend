import { useUserStore } from '~/store/user/user';

const plugin = defineNuxtPlugin(async () => {
  const route = useRoute();
  const userStore = useUserStore();
  const currentPath = route.path;

  const ignorePaths = ['/signup', '/login'];

  try {
    await userStore.getCurrentUser();
    if (ignorePaths.some((path) => currentPath.startsWith(path))) {
      navigateTo('/');
    }

    return;
  } catch (err) {
    console.error(err);
  }

  if (ignorePaths.some((path) => currentPath.startsWith(path))) {
    return;
  }

  if (!userStore.isLoggedIn) {
    await navigateTo('/signup');
  }
});

declare module '#app' {
  interface NuxtApp {
    $auth: ExtractPluginProvide<typeof plugin>['auth'];
  }
}

export default plugin;
