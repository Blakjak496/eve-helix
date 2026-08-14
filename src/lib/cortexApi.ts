// Thin client for equinox-backend's Cortex auth endpoints. Every call goes
// through /backend/* (see next.config.ts's rewrite) so it's same-origin
// from the browser's point of view - the session cookie equinox-backend
// sets just works, no CORS/credentials wrangling needed here.

const BASE = "/backend/cortex/auth";

export type CortexCharacter = {
  id: string;
  eveCharacterId: number;
  eveCharacterName: string;
  corporationId: number;
  allianceId: number | null;
  scopes: string[];
  needsRelink: boolean;
  linkedAt: string;
};

export type CortexSession = {
  accountId: string;
  activeCharacterId: string;
  characters: CortexCharacter[];
};

// Full-page navigations, not fetches - these start the SSO redirect dance,
// which has to leave nox-tools's origin entirely (to login.eveonline.com)
// and come back via equinox-backend's callback.
export function loginUrl(): string {
  return `${BASE}/login`;
}

export function linkCharacterUrl(): string {
  return `${BASE}/link`;
}

export async function fetchSession(): Promise<CortexSession | null> {
  const res = await fetch(`${BASE}/me`, { credentials: "include" });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Failed to load session (${res.status})`);
  const json = await res.json();
  return json.data as CortexSession;
}

export async function logout(): Promise<void> {
  await fetch(`${BASE}/logout`, { method: "POST", credentials: "include" });
}

export async function setActiveCharacter(characterId: string): Promise<void> {
  const res = await fetch(`${BASE}/active-character`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ characterId }),
  });
  if (!res.ok) throw new Error(`Failed to switch character (${res.status})`);
}

export async function unlinkCharacter(characterId: string): Promise<{ loggedOut: boolean }> {
  const res = await fetch(`${BASE}/characters/${characterId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to unlink character (${res.status})`);
  const json = await res.json();
  return { loggedOut: Boolean(json.loggedOut) };
}
