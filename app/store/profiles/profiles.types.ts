export interface Profile {
  id: string;
  name: string;
  email: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
}

export type ProfileState = Profile;
