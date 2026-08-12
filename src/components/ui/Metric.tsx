import type { ReactNode } from "react";
import clsx from "clsx";

type MetricTone = "default" | "positive" | "warning" | "danger";

interface MetricProps {
  label: string;
  value: ReactNode;
  tone?: MetricTone;
}

export function Metric({ label, value, tone = "default" }: MetricProps) {
  return (
    <div className={clsx("metric", tone !== "default" && `metric--${tone}`)}>
      <span className="metric__label">{label}</span>
      <span className="metric__value">{value}</span>
    </div>
  );
}

interface DataGridProps {
  children: ReactNode;
}

export function DataGrid({ children }: DataGridProps) {
  return <div className="data-grid">{children}</div>;
}
