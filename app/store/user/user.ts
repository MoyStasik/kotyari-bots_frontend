import { useUsersApiClient } from '~/api/users/users';
import type { UserState } from './user.types';
import type { CreateLoginUserRequestData, CreateLogoutUserRequestData, CreateRegisterUserRequestData, GetCurrentUserRequestData } from '~/api/users/users.types';

export const useUserStore = defineStore('users', () => {
  const user = ref<UserState>({
    id: '-1',
  });
  const isLoggedIn = ref(false);

  const ApiClient = useUsersApiClient();

  async function registerUser(data: CreateRegisterUserRequestData) {
    const response = await ApiClient.registerUser(data);

    if (response) {
      user.value.id = response.id;
      isLoggedIn.value = true;
    }

    return response;
  }

  async function loginUser(data: CreateLoginUserRequestData) {
    const response = await ApiClient.loginUser(data);

    if (response) {
      user.value.id = response.id;
      isLoggedIn.value = true;
    }

    return response;
  }

  async function logoutUser(data: CreateLogoutUserRequestData = {}) {
    const response = await ApiClient.logoutUser(data);

    isLoggedIn.value = false;

    return response;
  }

  async function getCurrentUser(data: GetCurrentUserRequestData = {}) {
    const response = await ApiClient.getCurrentUser(data);

    if (response) {
      user.value.id = response.id;
      isLoggedIn.value = true;
    }

    return response;
  }

  return {
    user,
    isLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,
  };
});
