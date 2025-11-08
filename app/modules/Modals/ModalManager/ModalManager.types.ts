export type ModalName =
  | 'ModalCreateBot'
  | 'ModalDeleteBot'
  | 'ModalCreateProfile'
  | 'ModalDeleteProfile';

export interface Props {
  botId?: string;
  closeOnGlobalClick?: boolean;
}
