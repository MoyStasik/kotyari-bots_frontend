import type { PostsState } from '~/store/posts/posts.types';

export interface TaskItemProps extends PostsState {}

export interface TaskItemWrapperProps {
  id: string;
}

export interface TaskItemWrapperHeaderProps {
  profileName: string;
  taskText: string;
}

export interface TaskItemWrapperContentProps {
  id: string;
}
