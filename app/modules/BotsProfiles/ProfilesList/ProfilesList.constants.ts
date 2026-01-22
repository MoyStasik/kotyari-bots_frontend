export type ProfilesSummaryTitles =
  | 'totalProfiles'
  | 'usedProfiles'
  | 'unusedProfiles';

export const ProfilesSummary: Record<
  ProfilesSummaryTitles,
  { text: string; icon: string }
> = {
  totalProfiles: {
    text: 'Всего профилей',
    icon: 'LucideUsers',
  },
  usedProfiles: {
    text: 'Используется',
    icon: 'LucideFileText',
  },
  unusedProfiles: {
    text: 'Не используется',
    icon: 'LucideMail',
  },
};
