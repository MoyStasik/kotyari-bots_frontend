export interface Profile {
  id: string;
  name: string;
  systemPrompt: string;
}

export interface BotsState {
  id: string;
  name: string;
  profiles: Profile[];
  profilesCount: number;
  systemPrompt: string;
  moderationRequired: boolean;
  createdAt: string;
  updatedAt: string;
}
