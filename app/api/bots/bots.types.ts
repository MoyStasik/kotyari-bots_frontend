import type { Profiles } from '~/store/bots/bots.types';
import type { BodyParams } from '../api.types';

export interface BotResponse {
  id: string;
  name: string;
  profiles: Profiles[];
  profilesCount: number;
  systemPrompt: string;
  moderationRequired: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface GetBotsResponse {
  data: BotResponse[];
}

export interface GetBotsRequestData extends BodyParams {}
