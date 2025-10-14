export type size = 'small' | 'medium';

export type buttonModes = 'custom' | 'transparent' | 'active' | 'danger';

export interface Props {
  size: size;
  mode: buttonModes;
  bordered?: boolean;
}
