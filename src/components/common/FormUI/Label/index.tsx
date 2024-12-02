import { ReactNode } from 'react';

interface ILabelProps {
  children: ReactNode;
  htmlFor?: string | number;
  required?: boolean;
}

export default function Label({ children, htmlFor, required }: ILabelProps) {
  return (
    <label className="label" htmlFor={htmlFor?.toString()}>
      {children}
      {required && <span>*</span>}
    </label>
  );
}
