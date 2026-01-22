import { useProfilesApiClient } from '~/api/profiles/profiles';
import type { Profile, ProfileState } from './profiles.types';
import type {
  CreateProfileRequestData,
  DeleteProfileRequestData,
  GetProfilesRequestData,
  UpdateProfileRequestData,
} from '~/api/profiles/profiles.types';
import type { ProfilesSummaryTitles } from '~/modules/BotsProfiles/ProfilesList/ProfilesList.constants';

export const useProfilesStore = defineStore('profileStore', () => {
  const profiles = ref<ProfileState[]>([]);
  const list = ref<ProfileState['id'][]>([]);
  const summary = ref<Record<ProfilesSummaryTitles, number>>({
    totalProfiles: 0,
    usedProfiles: 0,
    unusedProfiles: 0,
  });

  const ApiClient = useProfilesApiClient();

  function $reset() {
    profiles.value = [];
  }

  function add(profile: Profile) {
    const idx = list.value.findIndex((id) => profile.id === id);

    if (idx !== -1) {
      const profileEdited = {
        ...profile,
        prompt: profile.prompt || profile.systemPrompt || '',
      };
      profiles.value[idx] = profileEdited;
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
    summary.value.totalProfiles = response.data.length;
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
    summary,
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
