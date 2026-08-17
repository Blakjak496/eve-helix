"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  LogOut,
  Menu,
  MessagesSquare,
  Settings,
  X,
} from "lucide-react";

import Image from "next/image";

import { login } from "@/lib/helixApi";
import { useCortexSession } from "@/components/providers/CortexSessionProvider";
import { CharacterSwitcher } from "@/components/layout/CharacterSwitcher";

interface TopBarProps {
  navOpen?: boolean;
  onMenuClick?: () => void;
}

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  character_linked_elsewhere:
    "That character is already linked to another EVE Cortex login.",
  sso_denied: "EVE SSO login was cancelled.",
  invalid_state: "Login session expired - please try again.",
  sso_failed: "EVE SSO login failed - please try again.",
};

// plain browser APIs, not useSearchParams - avoids forcing a Suspense boundary here
function useAuthErrorFromUrl(): string | null {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("authError");
    if (!code) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage(AUTH_ERROR_MESSAGES[code] ?? "Login failed - please try again.");
    params.delete("authError");
    const rest = params.toString();
    window.history.replaceState(
      {},
      "",
      window.location.pathname + (rest ? `?${rest}` : ""),
    );
  }, []);

  return message;
}

export function TopBar({ navOpen = false, onMenuClick }: TopBarProps) {
  const { session, loading, logout } = useCortexSession();
  const authError = useAuthErrorFromUrl();

  return (
    <header className="topbar">
      {onMenuClick ? (
        <button
          type="button"
          className="topbar-menu"
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={navOpen}
          onClick={onMenuClick}
        >
          {navOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      ) : null}

      <div className="brand">
        <div className="brand-logo">
          <Image src="/cortex-logo.png" fill alt="Cortex Brand Logo" />
        </div>
        <div className="brand-text">
          EVE<span className="subtitle">Cortex</span>
        </div>
      </div>

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
        {session ? <CharacterSwitcher /> : null}
        {!loading && session ? (
          <button type="button" className="button" onClick={() => logout()}>
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        ) : !loading ? (
          <div className="session">
            <Image
              src="/eve-sso-login-black-small.png"
              width={195}
              height={30}
              alt="EVE SSO Login Button"
              className="login-button"
              onClick={login}
            />
            {authError ? (
              <span className="session__label session__label--error">
                {authError}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </header>
  );
}
