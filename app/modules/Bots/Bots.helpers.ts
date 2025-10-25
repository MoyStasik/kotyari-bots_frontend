import type { GetBostSummaryResponseData } from '~/api/bots/bots.types';

type BotSummaryKeys = keyof GetBostSummaryResponseData;

type BotSummary = {
  text: string,
  icon: string,
}

export const botsSummary: Record<BotSummaryKeys, BotSummary> = {
  totalBots: {
    text: 'Всего ботов',
    icon: 'LucideBot',
  },
  totalProfilesAttached: {
    text: 'Всего профилей',
    icon: 'LucideUsers',
  },
};
