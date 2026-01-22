export type ColumnNames = 'Название' | 'Email' | 'Создан';

export const TableHeader: Record<ColumnNames, { minWidth: number }> = {
  Название: { minWidth: 160 },
  Email: { minWidth: 205 },
  Создан: { minWidth: 190 },
};
