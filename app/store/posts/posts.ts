import type {
  CreatePostRequestData,
  GetPostsRequestData,
} from '~/api/posts/posts.types';
import type { PostsState } from './posts.types';
import { usePostsApiClient } from '~/api/posts/posts';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Partial<PostsState>[]>([]);
  const list = ref<PostsState['id'][]>([]);
  const groupIds = ref<string[]>([]);

  const ApiClient = usePostsApiClient();

  async function createPost(data: CreatePostRequestData) {
    const response = await ApiClient.CreatePost(data);

    if (response) {
      groupIds.value.push(response.groupID);
    }

    return response;
  }

  async function getPosts(data: GetPostsRequestData = {}) {
    const response = await ApiClient.GetPosts(data);

    if (response) {
      response.data.forEach((post) => {
        posts.value.push(post);
        list.value.push(post.id);
      });
    }

    return response;
  }

  function get(id: string) {
    return posts.value.find((post) => post.id === id);
  }

  return {
    groupIds,
    list,
    createPost,
    getPosts,
    get,
  };
});
