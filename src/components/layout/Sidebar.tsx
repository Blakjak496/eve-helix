"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/config/navigation";

interface SidebarProps {
  /** Whether the off-canvas drawer is open. Ignored above the 800px
   * breakpoint, where the sidebar is always visible inline. */
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        className={`sidebar-backdrop ${open ? "visible" : ""}`}
        aria-label="Close navigation"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <aside
        className={`sidebar ${open ? "open" : ""}`}
        aria-label="Main navigation"
      >
        <div className="sidebar-search">
          <input
            type="search"
            placeholder="Search Tools... ⌘K"
            aria-label="Search tools"
          />
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
                    className={`nav-item ${isActive ? "active" : ""}`}
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
    </>
  );
}
