import type { ReactNode } from "react";

import { TopBar } from "@/components/layout/TopBar";
import BottomBar from "@/components/layout/BottomBar";

export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="public-shell">
      <TopBar />
      <main className="workspace">
        {children}
        <BottomBar />
      </main>
    </div>
  );
}
