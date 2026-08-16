import type { HTMLAttributes, ReactNode } from "react";

interface PanelProps extends HTMLAttributes<HTMLElement> {
  /** Applies the cyan "active" HUD treatment (border + glow). */
  active?: boolean;
  children: ReactNode;
}

export function Panel({ active, className, children, ...props }: PanelProps) {
  return (
    <section
      className={`panel ${active ? "panel--active" : ""} ${className ?? ""}`}
      {...props}
    >
      {children}
    </section>
  );
}

interface PanelHeaderProps {
  title: ReactNode;
  actions?: ReactNode;
}

export function PanelHeader({ title, actions }: PanelHeaderProps) {
  return (
    <header className="panel-header">
      <h2>{title}</h2>
      {actions ? <div className="panel-actions">{actions}</div> : null}
    </header>
  );
}

export function PanelBody({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`panel-body ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
}
