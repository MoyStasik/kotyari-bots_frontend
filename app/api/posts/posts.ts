import { ApiClient } from '../ApiClient';
import type {
  CreatePostRequestData,
  CreatePostResponseData,
  GetPostRequestData,
  GetPostResponseData,
  GetPostsRequestData,
  GetPostsResponseData,
} from './posts.types';

class PostsApiClient extends ApiClient {
  public port = 8088;
  public createPostUrl = 'posts';
  public getPostsUrl = 'posts';
  public getPostUrl = 'posts';

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
      this.port
    );

    return response;
  }

  public async GetPosts(data: GetPostsRequestData) {
    const response = await this.get<GetPostsResponseData, GetPostsRequestData>(
      {
        url: this.getPostsUrl,
        ...data,
      },
      8089
    );

    return response;
  }

  public async GetPost(id: string, data: GetPostsRequestData) {
    const response = await this.get<GetPostResponseData, GetPostRequestData>(
    {
      url: `${this.getPostUrl}/${id}`,
      ...data
    }, 8089);

    return response;
  }
}

export const usePostsApiClient = () => new PostsApiClient();
