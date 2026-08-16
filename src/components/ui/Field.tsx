import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  htmlFor?: string;
  readOnly?: boolean;
  className?: string;
  children: ReactNode;
}

export function Field({ label, htmlFor, readOnly, className, children }: FieldProps) {
  return (
    <div className={`field ${readOnly ? "field--readonly" : ""} ${className ?? ""}`}>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  );
}
