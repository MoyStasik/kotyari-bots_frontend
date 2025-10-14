import type { Profile } from '~/store/bots/bots.types';
import type { BodyParams } from '../api.types';

export interface BotResponse {
  id: string;
  name: string;
  profiles: Profile[];
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

export interface CreateBotRequestData extends BodyParams {
  name: string;
  systemPrompt: string;
  moderationRequired: boolean;
  autoPublish: boolean;
}

export interface CreateBotResponseData extends BotResponse {}

export interface DeleteBotRequestData extends BodyParams {
  botId: string;
}

export interface DeleteBotResponseData {}

export interface UpdateBotRequestData extends CreateBotRequestData {}

export interface UpdateBotResponseData extends BotResponse {}
