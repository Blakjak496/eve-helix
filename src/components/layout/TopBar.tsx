"use client";

import { useEffect, useState } from "react";
import { FileText, LogOut, Menu, MessagesSquare, Settings, X } from "lucide-react";

import { loginUrl } from "@/lib/cortexApi";
import { useCortexSession } from "@/components/providers/CortexSessionProvider";
import { CharacterSwitcher } from "@/components/layout/CharacterSwitcher";

interface TopBarProps {
  navOpen?: boolean;
  onMenuClick?: () => void;
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  character_linked_elsewhere: "That character is already linked to another EVE Cortex login.",
  sso_denied: "EVE SSO login was cancelled.",
  invalid_state: "Login session expired - please try again.",
  sso_failed: "EVE SSO login failed - please try again.",
};

// Reads ?authError=... left by the backend's SSO callback redirect (see
// equinox-backend's routes/cortexAuth.ts) and strips it from the URL.
// Plain browser APIs in an effect rather than next/navigation's
// useSearchParams, which would force this always-rendered component into
// a Suspense boundary on every page.
function useAuthErrorFromUrl(): string | null {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("authError");
    if (!code) return;

    // One-time read of window.location on mount, not state derived from a
    // render input - there's no render-phase equivalent to move this to
    // (unlike AppShell's pathname-adjustment), so this is a justified
    // exception to the rule rather than a fix.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(AUTH_ERROR_MESSAGES[code] ?? "Login failed - please try again.");
    params.delete("authError");
    const rest = params.toString();
    window.history.replaceState({}, "", window.location.pathname + (rest ? `?${rest}` : ""));
  }, []);

  return message;
}

export function TopBar({ navOpen = false, onMenuClick }: TopBarProps) {
  const { session, loading, logout } = useCortexSession();
  const authError = useAuthErrorFromUrl();

  return (
    <header className="topbar">
      <button
        type="button"
        className="topbar-menu"
        aria-label={navOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={navOpen}
        onClick={onMenuClick}
      >
        {navOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div className="brand">
        NOX<span className="subtitle">Companion</span>
      </div>

      {!loading && session ? (
        <CharacterSwitcher />
      ) : !loading ? (
        <div className="session">
          <a className="button button--primary" href={loginUrl()}>
            Log In with EVE Online
          </a>
          {authError ? <span className="session__label session__label--error">{authError}</span> : null}
        </div>
      ) : null}

      <div className="topbar-actions">
        <a
          className="topbar-button"
          href="https://discord.com"
          target="_blank"
          rel="noreferrer"
        >
          <MessagesSquare size={16} />
          <span>Discord</span>
        </a>
        <a className="topbar-button" href="/docs">
          <FileText size={16} />
          <span>Docs</span>
        </a>
        <button type="button" className="topbar-button">
          <Settings size={16} />
          <span>Settings</span>
        </button>
        {session ? (
          <button type="button" className="button" onClick={() => logout()}>
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        ) : null}
      </div>
    </header>
  );
}
