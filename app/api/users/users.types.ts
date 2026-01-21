import type { BodyParams } from '../api.types';

export interface CreateRegisterUserRequestData extends BodyParams {
  email: string,
  username: string,
  password: string,
}

export interface CreateRegisterUserResponseData {
  id: string,
  email: string,
  username: string,
  createdAt: string,
  updatedAt: string,
}

export interface CreateLoginUserRequestData extends BodyParams {
  email: string,
  password: string,
}

export type CreateLoginUserResponseData = CreateRegisterUserResponseData;

export interface CreateLogoutUserRequestData extends BodyParams {
}

export interface CreateLogoutUserResponseData {};

export interface GetCurrentUserRequestData extends BodyParams {}

export type GetCurrentUserResponseData = CreateRegisterUserResponseData;
