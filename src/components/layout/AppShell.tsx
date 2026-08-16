"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import { IconRail } from "@/components/layout/IconRail";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    setNavOpen(false);
  }

  useEffect(() => {
    if (!navOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navOpen]);

  return (
    <div className="app">
      <TopBar
        navOpen={navOpen}
        onMenuClick={() => setNavOpen((open) => !open)}
      />
      <IconRail />
      <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <main className="workspace">{children}</main>
    </div>
  );
}
