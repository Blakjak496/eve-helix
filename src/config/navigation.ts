import type { LucideIcon } from "lucide-react";
import {
  Archive,
  BookOpen,
  Boxes,
  Cable,
  Factory,
  FlaskConical,
  LineChart,
  TrendingUp,
  Waypoints,
} from "lucide-react";

export interface NavItemConfig {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Marks a tool that isn't built yet — renders disabled with a "Soon" badge. */
  comingSoon?: boolean;
}

export interface NavSectionConfig {
  title: string;
  items: NavItemConfig[];
}

export const navigation: NavSectionConfig[] = [
  {
    title: "Navigation",
    items: [
      { label: "Jump Planner", href: "/jump-planner", icon: Waypoints },
      { label: "Ansiblex Jump Bridges", href: "/ansiblex", icon: Cable },
    ],
  },
  {
    title: "Industry",
    items: [
      { label: "Manufacturing Planner", href: "/manufacturing", icon: Factory },
    ],
  },
  {
    title: "Market",
    items: [
      { label: "Market Scanner", href: "/market-scanner", icon: LineChart, comingSoon: true },
      { label: "Price History", href: "/price-history", icon: TrendingUp, comingSoon: true },
    ],
  },
  {
    title: "Assets",
    items: [
      { label: "Asset Overview", href: "/assets", icon: Boxes, comingSoon: true },
      { label: "Stockpiles", href: "/stockpiles", icon: Archive, comingSoon: true },
    ],
  },
  {
    title: "Other",
    items: [
      { label: "Blueprint Library", href: "/blueprints", icon: BookOpen, comingSoon: true },
      { label: "Reaction Planner", href: "/reactions", icon: FlaskConical, comingSoon: true },
    ],
  },
];
