import { useBotsApiClient } from '~/api/bots/bots';
import type { BotsState } from './bots.types';
import type { CreateBotRequestData, GetBotsRequestData } from '~/api/bots/bots.types';

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

  function deleteBot(botId: string) {
    const botIndex = bots.value.findIndex(bot => bot.id === botId);
    if (botIndex !== -1) {
      bots.value.splice(botIndex, 1);
    }

    const listIndex = list.value.findIndex(id => id === botId);
    if (listIndex !== -1) {
      list.value.splice(listIndex, 1);
    }
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

  async function createBot(data: CreateBotRequestData) {
    const response = await ApiClient.createBot(data);

    if (response) {
      add(response);
      list.value.push(response.id);
    }

    return response;
  }

  return {
    bots,
    list,
    $reset,
    add,
    get,
    getBots,
    createBot,
    deleteBot,
  };
});
