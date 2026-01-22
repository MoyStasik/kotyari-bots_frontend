import { useBotsApiClient } from '~/api/bots/bots';
import type { BotsState } from './bots.types';
import type {
  CreateBotRequestData,
  GetBostSummaryResponseData,
  GetBotsRequestData,
  GetBotsSearchRequestData,
  UpdateBotRequestData,
} from '~/api/bots/bots.types';
import { useProfilesStore } from '../profiles/profiles';

export const useBotsStore = defineStore('bots', () => {
  const bots = ref<BotsState[]>([]);
  const list = ref<BotsState['id'][]>([]);

  // Добавляем новые состояния для поиска
  const searchList = ref<BotsState['id'][]>([]);
  const isSearchActive = ref(false);

  const summary = ref<GetBostSummaryResponseData>({
    totalBots: 0,
    totalProfilesAttached: 0,
  });

  const useProfiles = useProfilesStore();
  const ApiClient = useBotsApiClient();

  // Computed свойство, которое будем использовать в компоненте
  // Если поиск активен - возвращаем searchList, иначе обычный list
  const filteredList = computed(() => {
    return isSearchActive.value ? searchList.value : list.value;
  });

  function $reset() {
    bots.value = [];
    list.value = [];
    searchList.value = [];
    isSearchActive.value = false;
  }

  function add(bot: BotsState) {
    const isHas = bots.value.findIndex((b) => b.id === bot.id);

    // Если бота нет, добавляем. Если есть, обновляем (на случай если поиск вернул более свежие данные)
    if (isHas === -1) {
      bots.value.push(bot);
    } else {
      bots.value[isHas] = bot;
    }
  }

  function get(id: string) {
    return bots.value.find((bot) => {
      return bot.id === id;
    });
  }

  function update(id: string, payload: BotsState) {
    const botIndex = bots.value.findIndex((bot) => bot.id === id);
    if (botIndex !== -1) {
      bots.value[botIndex] = payload;
    }
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

    // Удаляем из поиска тоже, если там есть
    const searchIndex = searchList.value.findIndex((elemId) => elemId === id);
    if (searchIndex !== -1) {
      searchList.value.splice(searchIndex, 1);
    }
  }

  async function deleteBot(botId: string) {
    await ApiClient.deleteBot({ botId });
    remove(botId);
  }

  async function getBots(data: GetBotsRequestData = {}) {
    const response = await ApiClient.getBots(data);

    response.data.forEach((bot) => {
      // Логика добавления в общий list только если его там нет
      if (!list.value.includes(bot.id)) {
        list.value.push(bot.id);
      }
      add(bot);
      bot.profiles.forEach((profile) => useProfiles.add(profile));
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
    const profilesStore = useProfilesStore();

    if (!response) {
      return;
    }

    let key: keyof GetBostSummaryResponseData;
    for (key in response) {
      summary.value[key] = response[key];
    }

    profilesStore.summary.usedProfiles = summary.value.totalProfilesAttached;

    return response;
  }

  async function searchBots(data: GetBotsSearchRequestData) {
    // Если запрос пустой - выключаем режим поиска
    if (!data.query || data.query.trim() === '') {
      isSearchActive.value = false;
      searchList.value = [];
      return;
    }

    const response = await ApiClient.getBotsSearch(data);

    if (response && response.data) {
        // Очищаем предыдущий результат поиска
        searchList.value = [];

        response.data.forEach((bot) => {
            add(bot);
            searchList.value.push(bot.id);
        });

        isSearchActive.value = true;
    }

    return response;
  }

  return {
    bots,
    list,
    filteredList,
    summary,
    $reset,
    add,
    get,
    getBots,
    createBot,
    deleteBot,
    updateBot,
    getSummary,
    searchBots,
  };
});
