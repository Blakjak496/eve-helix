"use client";

import {
  BarChart3,
  Compass,
  Crosshair,
  LayoutGrid,
  List,
  Radar,
  Search,
  SquareTerminal,
  Wallet,
} from "lucide-react";
import clsx from "clsx";

// Decorative quick-launch strip matching the mockup's leftmost icon
// column. Not wired to routing yet — treat as a placeholder until the
// app's top-level sections (and what belongs in each) are settled.
const railItems = [
  { icon: Compass, label: "Navigation" },
  { icon: Crosshair, label: "Targeting" },
  { icon: Search, label: "Search" },
  { icon: SquareTerminal, label: "Console" },
  { icon: LayoutGrid, label: "Industry", active: true },
  { icon: BarChart3, label: "Market" },
  { icon: Wallet, label: "Assets" },
  { icon: List, label: "Lists" },
  { icon: Radar, label: "Intel" },
];

export function IconRail() {
  return (
    <nav className="icon-rail" aria-label="Quick launch">
      {railItems.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          type="button"
          className={clsx("icon-rail__item", active && "active")}
          aria-label={label}
          title={label}
        >
          <Icon size={16} />
        </button>
      ))}
    </nav>
  );
}
