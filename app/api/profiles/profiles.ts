import { ApiClient } from '../ApiClient';
import type {
  CreateProfileRequestData,
  CreateProfileResponseData,
  DeleteProfileRequestData,
  DeleteProfileResponseData,
  GetProfilesRequestData,
  GetProfilesResponseData,
} from './profiles.types';

class ProfilesApiClient extends ApiClient {
  public getProfilesUrl = 'profiles';
  public deleteProfileUrl = 'profiles/';
  public createProfileUrl = 'profiles';
  public updateProfileUrl = 'profiles/';

  public async getProfiles(data: GetProfilesRequestData) {
    const response = await this.get<
      GetProfilesResponseData,
      GetProfilesRequestData
    >(
      {
        url: this.getProfilesUrl,
        ...data,
      },
    );

    return response;
  }

  public async deleteProfile(data: DeleteProfileRequestData) {
    const response = await this.delete<
      DeleteProfileResponseData,
      DeleteProfileRequestData
    >(
      {
        url: `${this.deleteProfileUrl}${data.profileId}`,
        ...data,
      },
    );

    return response;
  }

  public async createProfile(data: CreateProfileRequestData) {
    const response = await this.post<
      CreateProfileResponseData,
      CreateProfileRequestData
    >(
      {
        url: this.createProfileUrl,
        body: {
          ...data,
        },
      },
    );

    return response;
  }

  public async updateProfile(
    profileId: string,
    data: CreateProfileRequestData
  ) {
    const response = await this.put<
      CreateProfileResponseData,
      CreateProfileRequestData
    >(
      {
        url: `${this.updateProfileUrl}${profileId}`,
        body: {
          ...data,
        },
      },
    );

    return response;
  }
}

export const useProfilesApiClient = () => new ProfilesApiClient();
