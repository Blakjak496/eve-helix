"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { navigation } from "@/config/navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <input type="search" placeholder="Search Tools... ⌘K" aria-label="Search tools" />
      </div>

      <nav>
        {navigation.map((section) => (
          <div className="nav-section" key={section.title}>
            <div className="nav-section__title">{section.title}</div>

            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              if (item.comingSoon) {
                return (
                  <span
                    key={item.href}
                    className="nav-item nav-item--disabled"
                    aria-disabled="true"
                  >
                    <span className="icon">
                      <Icon size={16} />
                    </span>
                    <span>{item.label}</span>
                    <span className="nav-item__badge">Soon</span>
                  </span>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx("nav-item", isActive && "active")}
                >
                  <span className="icon">
                    <Icon size={16} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
