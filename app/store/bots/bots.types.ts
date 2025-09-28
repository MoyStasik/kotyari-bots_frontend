export interface Profiles {
  id: string;
  name: string;
  email: string;
  systemPrompt: string;
}

export interface BotsState {
  id: string;
  name: string;
  profiles: Profiles[];
  profilesCount: number;
  systemPrompt: string;
  moderationRequired: boolean;
  createdAt: string;
  updatedAt: string;
}
