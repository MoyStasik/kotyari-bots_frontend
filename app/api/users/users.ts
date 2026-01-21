import { ApiClient } from '../ApiClient';
import type { CreateLoginUserRequestData, CreateLoginUserResponseData, CreateLogoutUserRequestData, CreateLogoutUserResponseData, CreateRegisterUserRequestData, CreateRegisterUserResponseData, GetCurrentUserRequestData, GetCurrentUserResponseData } from './users.types';


class UsersApiClient extends ApiClient {
  public createLoginUserUrl = 'login';
  public createRegisterUserUrl = 'register';
  public createLogoutUserUrl = 'logout';
  public getCurrentUserProfile = 'users/profile';

  public async registerUser(data: CreateRegisterUserRequestData) {
    const response = await this.post<CreateRegisterUserResponseData, CreateRegisterUserRequestData>({
      url: this.createRegisterUserUrl,
      body: {
        ...data,
      },
    });

    return response;
  }

  public async loginUser(data: CreateLoginUserRequestData) {
    const response = await this.post<CreateLoginUserResponseData, CreateLoginUserRequestData>({
      url: this.createLoginUserUrl,
      body: {
        ...data,
      },
    });

    return response;
  }

  public async logoutUser(data: CreateLogoutUserRequestData) {
    const response = await this.post<CreateLogoutUserResponseData, CreateLogoutUserRequestData>({
      url: this.createLogoutUserUrl,
      body: {
        ...data,
      },
    });

    return response;
  }

  public async getCurrentUser(data: GetCurrentUserRequestData) {
    const response = await this.get<GetCurrentUserResponseData, GetCurrentUserRequestData>({
      url: this.getCurrentUserProfile,
      ...data,
    });

    return response;
  }
};

export const useUsersApiClient = () => new UsersApiClient();
