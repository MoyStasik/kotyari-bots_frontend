import type { Profile } from '~/store/profiles/profiles.types';

export const useBotsCreateForm = () => {
  const botName = ref<string>('');
  const prompt = ref<string>('');
  const moderationRequired = ref(false);
  const botProfiles = ref<Profile[]>([]);

  return {
    botName,
    prompt,
    moderationRequired,
    botProfiles,
  };
};
