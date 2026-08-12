import type { ReactNode } from "react";

import { IconRail } from "@/components/layout/IconRail";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

interface AppShellProps {
  children: ReactNode;
  characterName?: string;
  online?: boolean;
}

export function AppShell({ children, characterName, online }: AppShellProps) {
  return (
    <div className="app">
      <TopBar characterName={characterName} online={online} />
      <IconRail />
      <Sidebar />
      <main className="workspace">{children}</main>
    </div>
  );
}
