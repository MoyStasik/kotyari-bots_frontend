import type { Profile } from '~/store/bots/bots.types';

export const useBotsCreateForm = () => {
  const botName = ref<string>('');
  const prompt = ref<string>('');
  const moderationRequired = ref(false);
  const botProfiles = ref<Partial<Profile>[]>([]);

  return {
    botName,
    prompt,
    moderationRequired,
    botProfiles,
  };
};
