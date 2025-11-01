import type { Profile } from '~/store/profiles/profiles.types';
import type { BodyParams } from '../api.types';

export interface GetProfilesRequestData extends BodyParams {}

export interface GetProfilesResponseData {
  data: Profile[];
}

export interface DeleteProfileRequestData extends BodyParams {
  profileId: string,
}

export interface DeleteProfileResponseData {}

export interface CreateProfileRequestData extends BodyParams {
  name: string,
  email: string,
  prompt: string,
}

export interface CreateProfileResponseData extends Profile {}

export interface UpdateProfileRequestData extends BodyParams {
  name: string,
  email: string,
  prompt: string,
}

export interface UpdateProfileResponseData extends Profile {}
