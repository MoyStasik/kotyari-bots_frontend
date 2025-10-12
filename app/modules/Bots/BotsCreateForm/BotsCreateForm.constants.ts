import type { Profile } from '~/store/bots/bots.types';

export const BotsProfiles: Profile[] = [
  {
    id: '1',
    name: 'Продавец-консультант',
    systemPrompt: 'Консультант',
  },
  {
    id: '2',
    name: 'Служба поддержки',
    systemPrompt: 'Поддержка',
  },
  {
    id: '3',
    name: 'Маркетолог',
    systemPrompt: 'Маркетолог',
  },
];
