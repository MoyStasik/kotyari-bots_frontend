import type { TextareaHTMLAttributes } from 'vue';

export interface Props {
  placeholder: string;
  value: TextareaHTMLAttributes['value'];
  minHeight?: number;
}
