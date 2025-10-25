import type { Profile } from '~/store/profiles/profiles.types';

export interface BotsProfilesAddItemProps {
  profile?: Profile;
}

export interface BotsProfilesPinnedProps {
  profiles: Profile[];
}
