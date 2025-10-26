import type { Profile } from '../profiles/profiles.types';

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
