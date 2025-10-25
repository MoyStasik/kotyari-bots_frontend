import { ApiClient } from '../ApiClient';
import type {
  GetProfilesRequestData,
  GetProfilesResponseData,
} from './profiles.types';

class ProfilesApiClient extends ApiClient {
  public port = 8003;
  public getProfilesUrl = 'profiles';

  public async getProfiles(data: GetProfilesRequestData) {
    const response = await this.get<
      GetProfilesResponseData,
      GetProfilesRequestData
    >(
      {
        url: this.getProfilesUrl,
        ...data,
      },
      this.port
    );

    return response;
  }
}

export const useProfilesApiClient = () => new ProfilesApiClient();
