import type { ReactNode } from "react";
import clsx from "clsx";

type StatusVariant = "online" | "warning" | "danger" | "offline";

interface StatusIndicatorProps {
  variant?: StatusVariant;
  children: ReactNode;
}

export function StatusIndicator({ variant = "online", children }: StatusIndicatorProps) {
  return <span className={clsx("status", `status--${variant}`)}>{children}</span>;
}
