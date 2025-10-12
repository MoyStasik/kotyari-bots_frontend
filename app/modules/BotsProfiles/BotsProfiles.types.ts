import type { Profile } from '~/store/bots/bots.types';

export interface BotsProfilesAddItemProps extends Partial<Profile> {};

export interface BotsProfilesPinnedProps {
  profiles: Partial<Profile>[],
};
