import type { BotResponse } from '~/api/bots/bots.types';
import type { Profile } from '~/store/profiles/profiles.types';

export interface BotsCreateFormProfilesProps {
  pinnedProfiles: Profile[];
  availableProfiles: Profile['id'][];
}

export interface BotsCreateFormProps {
  bot?: BotResponse;
}
