import type { ReactNode } from "react";

type StatusVariant = "online" | "warning" | "danger" | "offline";

interface StatusIndicatorProps {
  variant?: StatusVariant;
  children: ReactNode;
}

export function StatusIndicator({ variant = "online", children }: StatusIndicatorProps) {
  return <span className={`status status--${variant}`}>{children}</span>;
}
