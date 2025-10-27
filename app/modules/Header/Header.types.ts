export type tabs = 'Боты' | 'Аккаунт' | 'Профили';

export interface TabHeader {
  tabName: tabs;
  route: string;
}

export interface Props {
  headerWrapperStyles: object;
}
