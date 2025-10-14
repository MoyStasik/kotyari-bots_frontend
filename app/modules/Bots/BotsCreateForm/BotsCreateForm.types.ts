import type { BotResponse } from '~/api/bots/bots.types';
import type { Profile } from '~/store/bots/bots.types';

export interface BotsCreateFormProfilesProps {
  profiles: Profile[];
}

export interface BotsCreateFormProps {
  bot?: BotResponse;
}
