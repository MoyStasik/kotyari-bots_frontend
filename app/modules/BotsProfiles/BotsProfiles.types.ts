import type { Profile } from '~/store/bots/bots.types';

export interface BotsProfilesAddItemProps {
  profile: Profile;
}

export interface BotsProfilesPinnedProps {
  profiles: Profile[];
}
