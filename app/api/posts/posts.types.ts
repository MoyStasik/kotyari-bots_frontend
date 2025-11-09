import type { BodyParams } from '../api.types';

export interface CreatePostRequestData extends BodyParams {
  botId: string;
  profileId: string[];
  taskText: string;
  platform: string;
}

export interface CreatePostResponseData {
  groupID: string;
}

export interface GetPostsRequestData extends BodyParams {}

export interface PostData {
  id: string;
  otvetiId: string;
  botId: string;
  profileId: string[];
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
