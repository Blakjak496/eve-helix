import type { ReactNode } from "react";

import { TopBar } from "@/components/layout/TopBar";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-shell">
      <TopBar />
      <main className="workspace">{children}</main>
    </div>
  );
}
