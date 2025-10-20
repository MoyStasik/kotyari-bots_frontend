import type { ModalName } from '~/modules/Modals/ModalManager/ModalManager.types';
import { Bus, type callback } from '~/utils/Bus';

type events = 'open' | 'close';

const plugin = defineNuxtPlugin(() => {
  const bus = new Bus<events>();

  const modal = {
    on: (event: events, callback: callback) => {
      bus.subscribe(event, callback);
    },
    off: (event: events, callback: callback) => {
      bus.unsubscribe(event, callback);
    },
    open: (name: ModalName, props: any) => {
      bus.emit('open', name, props);
    },
    close: (name: ModalName) => {
      bus.emit('close', name);
    },
  };

  return {
    provide: {
      modal,
    },
  };
});

declare module '#app' {
  interface NuxtApp {
    $modal: ExtractPluginProvide<typeof plugin>['modal'];
  }
}

export default plugin;
