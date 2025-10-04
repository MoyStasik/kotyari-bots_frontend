import type { InputHTMLAttributes, InputTypeHTMLAttribute } from 'vue';

export interface Props {
  name: InputHTMLAttributes['name'];
  type: InputTypeHTMLAttribute;
  placeholder?: string;
  size?: number;
  value?: string,
}
