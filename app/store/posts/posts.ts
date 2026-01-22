import type {
  CreatePostRequestData,
  CreatePostSeenRequestData,
  CreatePublishPostRequestData,
  EditPostRequestData,
  GetPostRequestData,
  GetPostsRequestData,
  GetPostsStatusRequestData,
} from '~/api/posts/posts.types';
import type { PostsState } from './posts.types';
import { usePostsApiClient } from '~/api/posts/posts';

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Partial<PostsState>[]>([]);
  const list = ref<PostsState['id'][]>([]);
  const groupIds = ref<string[]>([]);
  const shownPosts = new Set<PostsState['id']>();

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

  async function getPost(id: string, data: GetPostRequestData = {}) {
    const response = await ApiClient.GetPost(id, data);

    if (response) {
      posts.value.push(response);
      list.value.push(response.id);
    }

    return response;
  }

  async function getPostsStatus(data: GetPostsStatusRequestData = {}) {
    const response = await ApiClient.getPostsReadyStatus(data);

    const result: PostsState['id'][] = [];
    if (response) {
      response.data.forEach((item) => {
        if (item.isReady && !shownPosts.has(item.id)) {
          result.push(item.id);
          shownPosts.add(item.id);
        }
      });
    }

    return result;
  }

  async function createPostSeen(data: CreatePostSeenRequestData) {
    const response = await ApiClient.CreatePostSeen(data);

    return response;
  }

  async function updatePost(postId: string, data: EditPostRequestData) {
    const response = await ApiClient.EditPost(postId, data);

    if (response) {
      const postIdx = posts.value.findIndex((post) => post.id === postId);
      const listIdx = list.value.findIndex((id) => id === postId);
      posts.value[postIdx] = response;
      list.value[listIdx] = response.id;
    }

    return response;
  }

  async function publishPost(
    postId: string,
    data: CreatePublishPostRequestData
  ) {
    const response = await ApiClient.CreatePublishPost(postId, data);

    return response;
  }

  function get(id: string) {
    return posts.value.find((post) => post.id === id);
  }

  return {
    posts,
    groupIds,
    list,
    shownPosts,
    createPost,
    createPostSeen,
    getPosts,
    getPost,
    getPostsStatus,
    get,
    updatePost,
    publishPost,
  };
});
