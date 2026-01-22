export interface Profile {
  id: string;
  name: string;
  email: string;
  prompt: string;
  systemPrompt?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProfileState = Profile;
