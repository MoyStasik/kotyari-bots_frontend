import { useProfilesApiClient } from '~/api/profiles/profiles';
import type { Profile, ProfileState } from './profiles.types';
import type { GetProfilesRequestData } from '~/api/profiles/profiles.types';

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

  function update() {}

  function remove() {}

  async function getProfiles(data: GetProfilesRequestData = {}) {
    const response = await ApiClient.getProfiles(data);
    response.data.forEach((profile) => {
      add(profile);
    });

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
  };
});
