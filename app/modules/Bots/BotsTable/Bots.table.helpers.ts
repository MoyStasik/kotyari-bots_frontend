import type { BotsState } from '~/store/bots/bots.types';
import type { ColumnNames } from './Bots.table.constants';
import { TableHeader } from './Bots.table.constants';

export const getFormattedBotInfo = (bot: BotsState | undefined) => {
  const { isDesktop } = useAdaptivity();
  const entries = Object.entries(TableHeader);

  return entries.map((element) => {
    return {
      name: getBotParam(<ColumnNames>element[0], bot),
      columnName: element[0],
      minWidth: isDesktop.value
        ? element[1].minWidth + 70
        : element[1].minWidth,
    };
  });
};

const getBotParam = (tableParam: ColumnNames, bot: BotsState | undefined) => {
  switch (tableParam) {
    case 'Имя':
      return bot?.name;
    case 'Профилей':
      return bot?.profilesCount;
    case 'Создан':
      return bot?.createdAt;
    case 'Модерация':
      return bot?.moderationRequired ? 'Да' : 'Нет';
    default:
      break;
  }
};
