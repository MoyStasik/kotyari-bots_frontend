export type ModalName =
  'ModalCreateBot' |
  'ModalDeleteBot' |
  'ModalCreateProfile';

export interface Props {
  botId?: string;
  closeOnGlobalClick?: boolean;
}
