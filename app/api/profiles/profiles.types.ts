import type { Profile } from '~/store/profiles/profiles.types';
import type { BodyParams } from '../api.types';

export interface GetProfilesRequestData extends BodyParams {}

export interface GetProfilesResponseData {
  data: Profile[];
}
