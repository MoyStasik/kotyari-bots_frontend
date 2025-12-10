export const useProfilesCreateForm = () => {
  const profileName = ref<string>('');
  const email = ref<string>('');
  const prompt = ref<string>('');

  return {
    profileName,
    email,
    prompt,
  };
};
