import { FileText, LogOut, MessagesSquare, Settings } from "lucide-react";

import { StatusIndicator } from "@/components/ui/StatusIndicator";

interface TopBarProps {
  characterName?: string;
  online?: boolean;
}

export function TopBar({ characterName = "Pilot", online = true }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="brand">
        EVE<span className="subtitle">Tools</span>
      </div>

      <div className="session">
        <span className="session__label">Connected as {characterName}</span>
        <StatusIndicator variant={online ? "online" : "offline"}>
          {online ? "Online" : "Offline"}
        </StatusIndicator>
      </div>

      <div className="topbar-actions">
        <a className="topbar-button" href="https://discord.com" target="_blank" rel="noreferrer">
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
        <button type="button" className="button">
          <LogOut size={14} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
