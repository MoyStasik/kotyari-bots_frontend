import { useBotsApiClient } from '~/api/bots/bots';
import type { BotsState } from './bots.types';
import type {
  CreateBotRequestData,
  GetBostSummaryResponseData,
  GetBotsRequestData,
  UpdateBotRequestData,
} from '~/api/bots/bots.types';

export const useBotsStore = defineStore('bots', () => {
  const bots = ref<BotsState[]>([]);
  const list = ref<BotsState['id'][]>([]);
  const summary = ref<GetBostSummaryResponseData>({ totalBots: 0, totalProfilesAttached: 0 });

  const ApiClient = useBotsApiClient();

  function $reset() {
    bots.value = [];
  }

  function add(bot: BotsState) {
    const isHas = list.value.findIndex((id) => bot.id === id);

    if (isHas !== -1) {
      return;
    }

    bots.value.push(bot);
  }

  function get(id: string) {
    return bots.value.find((bot) => {
      return bot.id === id;
    });
  }

  function update(id: string, payload: BotsState) {
    const botIndex = bots.value.findIndex((bot) => bot.id === id);
    bots.value[botIndex] = payload;
  }

  function remove(id: string) {
    const botIndex = bots.value.findIndex((bot) => bot.id === id);
    if (botIndex !== -1) {
      bots.value.splice(botIndex, 1);
    }

    if (summary.value.totalBots) {
      summary.value.totalBots--;
    }

    const listIndex = list.value.findIndex((elemId) => elemId === id);
    if (listIndex !== -1) {
      list.value.splice(listIndex, 1);
    }
  }

  async function deleteBot(botId: string) {
    await ApiClient.deleteBot({ botId });

    remove(botId);
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

    if (!response) {
      return;
    }

    add(response);
    list.value.unshift(response.id);

    if (summary.value) {
      summary.value.totalBots++;
      summary.value.totalProfilesAttached += data.profiles.length;
    }

    return response;
  }

  async function updateBot(botId: string, data: UpdateBotRequestData) {
    const response = await ApiClient.updateBot(botId, data);

    if (!response) {
      return;
    }

    update(botId, response);
    if (summary.value && data.profiles.length == 0) {
      summary.value.totalProfilesAttached--;
    }

    return response;
  }

  async function getSummary(data: GetBotsRequestData = {}) {
    const response = await ApiClient.getBotsSummary(data);

    if (!response) {
      return;
    }

    let key: keyof GetBostSummaryResponseData;
    for (key in response) {
      summary.value[key] = response[key];
    }

    return response;
  }

  return {
    bots,
    list,
    summary,
    $reset,
    add,
    get,
    getBots,
    createBot,
    deleteBot,
    updateBot,
    getSummary,
  };
});
