export type size = "small" | "medium";

export type buttonModes =
  | "custom"
  | "transparent"
  | "active"
  | "light"
  | "danger";

export interface Props {
  size: size;
  mode: buttonModes;
}
