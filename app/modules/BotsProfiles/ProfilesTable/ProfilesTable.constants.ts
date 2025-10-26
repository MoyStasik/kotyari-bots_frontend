export type ColumnNames = 'Название' | 'Email' | 'Используется';

export const TableHeader: Record<ColumnNames, { minWidth: number }> = {
  Название: { minWidth: 160 },
  Email: { minWidth: 205 },
  Используется: { minWidth: 190 },
};
