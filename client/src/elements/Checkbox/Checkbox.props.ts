import { ReactNode, ChangeEvent } from "react";

export interface CheckboxProps {
  checked: boolean;
  label: string;
  className?: string;
  children?: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
