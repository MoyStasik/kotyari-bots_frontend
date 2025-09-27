export type tabs = 'Боты' | 'Профиль';

export interface TabHeader {
  tabName: tabs;
  route: string;
}

export interface Props {
  headerWrapperStyles: object;
}
