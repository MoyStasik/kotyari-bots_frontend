export type ColumnNames = 'Имя' | 'Профилей' | 'Создан' | 'Модерация';

export const TableHeader: Record<ColumnNames, { minWidth: number }> = {
  Имя: { minWidth: 160 },
  Профилей: { minWidth: 78 },
  Создан: { minWidth: 98 },
  Модерация: { minWidth: 104 },
};
