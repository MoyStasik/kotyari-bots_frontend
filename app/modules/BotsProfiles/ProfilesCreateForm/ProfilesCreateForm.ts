export const useProfilesCreateForm = () => {
  const profileName = ref<string>('');
  const email = ref<string>('test@mail.ru');
  const prompt = ref<string>('');

  return {
    profileName,
    email,
    prompt,
  };
};
