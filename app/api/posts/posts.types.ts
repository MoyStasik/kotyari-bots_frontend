import type { BodyParams } from '../api.types';

export interface CreatePostRequestData extends BodyParams {
  botId: string;
  profileIds: string[];
  taskText: string;
  platform: string;
}

export interface CreatePostResponseData {
  groupID: string;
}

export interface GetPostsRequestData extends BodyParams {}

export interface PostData {
  id: string;
  otvetiId: number;
  botId: string;
  profileId: string[] | string;
  botName: string;
  profileName: string;
  platfrom: string;
  title: string;
  text: string;
  postType: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetPostsResponseData {
  data: PostData[];
}

export interface GetPostRequestData extends BodyParams {}

export interface GetPostResponseData extends PostData {}

export interface GetPostsStatusRequestData extends BodyParams {}

export interface PostReadyStatus {
  id: string,
  groupID: string,
  isReady: string,
}
export interface GetPostsReadyStatusResponseData {
  data: PostReadyStatus[],
}
export interface GetPostsResponseData {
  data: PostData[];
}

export interface CreatePostSeenRequestData extends BodyParams {
  seen: PostData['id'][],
}

export interface CreatePostSeenResponseData {}
