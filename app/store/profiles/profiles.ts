import { useProfilesApiClient } from '~/api/profiles/profiles';
import type { Profile, ProfileState } from './profiles.types';
import type {
  CreateProfileRequestData,
  DeleteProfileRequestData,
  GetProfilesRequestData,
  UpdateProfileRequestData,
} from '~/api/profiles/profiles.types';

export const useProfilesStore = defineStore('profileStore', () => {
  const profiles = ref<ProfileState[]>([]);
  const list = ref<ProfileState['id'][]>([]);

  const ApiClient = useProfilesApiClient();

  function $reset() {
    profiles.value = [];
  }

  function add(profile: Profile) {
    const isHas = list.value.findIndex((id) => profile.id === id);

    if (isHas !== -1) {
      return;
    }

    profiles.value.push(profile);
    list.value.push(profile.id);
  }

  function get(id: Profile['id']) {
    return profiles.value.find((profile) => profile.id === id);
  }

  function update(profile: Profile) {
    const profileIdx = profiles.value.findIndex(
      (item) => item.id === profile.id
    );
    profiles.value[profileIdx] = profile;
  }

  function remove(id: Profile['id']) {
    const profileIndex = profiles.value.findIndex(
      (profile) => profile.id === id
    );

    if (profileIndex !== -1) {
      profiles.value.splice(profileIndex, 1);
    }

    const listIndex = list.value.findIndex((elemId) => elemId === id);
    if (listIndex !== -1) {
      list.value.splice(listIndex, 1);
    }
  }

  async function getProfiles(data: GetProfilesRequestData = {}) {
    const response = await ApiClient.getProfiles(data);
    response.data.forEach((profile) => {
      add(profile);
    });

    return response;
  }

  async function createProfile(data: CreateProfileRequestData) {
    const response = await ApiClient.createProfile(data);

    if (response) {
      add(response);
    }

    return response;
  }

  async function deleteProfile(data: DeleteProfileRequestData) {
    const response = await ApiClient.deleteProfile(data);
    remove(data.profileId);

    return response;
  }

  async function updateProfile(
    profileId: string,
    data: UpdateProfileRequestData
  ) {
    const response = await ApiClient.updateProfile(profileId, data);

    if (response) {
      update(response);
    }

    return response;
  }

  return {
    profiles,
    list,
    $reset,
    add,
    get,
    update,
    remove,
    getProfiles,
    createProfile,
    deleteProfile,
    updateProfile,
  };
});
