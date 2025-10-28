import { TableHeader, type ColumnNames } from './ProfilesTable.constants';
import type { ProfileState } from '~/store/profiles/profiles.types';

export const getFormattedProfileInfo = (profile: ProfileState | undefined) => {
  const { isDesktop } = useAdaptivity();
  const entries = Object.entries(TableHeader);

  return entries.map((element) => {
    return {
      name: getBotParam(<ColumnNames>element[0], profile),
      columnName: element[0],
      minWidth: isDesktop.value
        ? element[1].minWidth + 70
        : element[1].minWidth,
    };
  });
};

const getBotParam = (tableParam: ColumnNames, profile: ProfileState | undefined) => {
  switch (tableParam) {
    case 'Название':
      return profile?.name;
    case 'Email':
      return profile?.email;
    case 'Используется':
      return profile?.createdAt;
    default:
      break;
  }
};
