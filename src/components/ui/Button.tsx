import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "primary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Stretches the button to fill its container (e.g. "Export to ESI"). */
  fullWidth?: boolean;
}

export function Button({
  variant = "default",
  fullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`button ${variant !== "default" ? `button--${variant}` : ""} ${fullWidth ? "button--full" : ""} ${className ?? ""}`}
      {...props}
    />
  );
}
