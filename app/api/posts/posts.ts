import { ApiClient } from '../ApiClient';
import type {
  CreatePostRequestData,
  CreatePostResponseData,
  CreatePostSeenRequestData,
  CreatePostSeenResponseData,
  GetPostRequestData,
  GetPostResponseData,
  GetPostsReadyStatusResponseData,
  GetPostsRequestData,
  GetPostsResponseData,
} from './posts.types';

class PostsApiClient extends ApiClient {
  public createPostUrl = 'posts';
  public getPostsUrl = 'posts';
  public getPostUrl = 'posts';
  public checkPostStatusUrl = 'posts/check';
  public checkPostsStatusUrl = 'posts/check';
  public createPostSeenUrl = 'posts/seen';

  public async CreatePost(data: CreatePostRequestData) {
    const response = await this.post<
      CreatePostResponseData,
      CreatePostRequestData
    >(
      {
        url: this.createPostUrl,
        body: {
          ...data,
        },
      },
    );

    return response;
  }

  public async GetPosts(data: GetPostsRequestData) {
    const response = await this.get<GetPostsResponseData, GetPostsRequestData>(
      {
        url: this.getPostsUrl,
        ...data,
      },
    );

    return response;
  }

  public async GetPost(id: string, data: GetPostsRequestData) {
    const response = await this.get<GetPostResponseData, GetPostRequestData>(
      {
        url: `${this.getPostUrl}/${id}`,
        ...data,
      },
    );

    return response;
  }

  public async getPostsStatus(groupId: string, data: GetPostsRequestData) {
    const response = await this.get<GetPostsResponseData, GetPostsRequestData>(
      {
        url: `${this.checkPostStatusUrl}/${groupId}`,
        ...data,
      },
    );

    return response;
  }

  public async getPostsReadyStatus(data: GetPostsRequestData) {
    const response = await this.get<GetPostsReadyStatusResponseData, GetPostsRequestData>(
      {
        url: `${this.checkPostsStatusUrl}`,
        ...data,
      },
    );

    return response;
  }

  public async CreatePostSeen(data: CreatePostSeenRequestData) {
    const response = await this.post<CreatePostSeenResponseData, CreatePostSeenRequestData>(
      {
        url: `${this.createPostSeenUrl}`,
        body: {
          ...data,
        },
      },
    );

    return response;
  }
}

export const usePostsApiClient = () => new PostsApiClient();
