import { useBotsApiClient } from '~/api/bots/bots';
import type { BotsState } from './bots.types';
import type { GetBotsRequestData } from '~/api/bots/bots.types';

export const useBotsStore = defineStore('bots', () => {
  const bots = ref<BotsState[]>([]);
  const list = ref<BotsState['id'][]>([]);

  const ApiClient = useBotsApiClient();

  function $reset() {
    bots.value = [];
  }

  function add(bot: BotsState) {
    bots.value.push(bot);
  }

  function get(id: string) {
    return bots.value.find((bot) => {
      return bot.id === id;
    });
  }

  async function getBots(data: GetBotsRequestData = {}) {
    const response = await ApiClient.getBots(data);

    response.data.forEach((bot) => {
      add(bot);
      list.value.push(bot.id);
    });

    return response;
  }

  return {
    bots,
    list,
    $reset,
    add,
    get,
    getBots,
  };
});
