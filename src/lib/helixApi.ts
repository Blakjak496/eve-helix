const BACKEND = process.env.NEXT_PUBLIC_HELIX_BACKEND_URL;
const BASE = `${BACKEND}/auth`;

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

export function login(): void {
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = `${BASE}/login`;
}

export function linkCharacter(): void {
  // eslint-disable-next-line @next/next/no-location-assign-relative-destination
  window.location.href = `${BASE}/link`;
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

export async function unlinkCharacter(
  characterId: string,
): Promise<{ loggedOut: boolean }> {
  const res = await fetch(`${BASE}/characters/${characterId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`Failed to unlink character (${res.status})`);
  const json = await res.json();
  return { loggedOut: Boolean(json.loggedOut) };
}

export type SystemStatusValue = 1 | 2 | 3 | "unreachable" | "unknown";

export async function fetchSystemStatus(): Promise<SystemStatusValue> {
  try {
    const res = await fetch(`${BACKEND}/status`, {
      credentials: "include",
    });
    if (!res.ok) return "unreachable";
    const json = await res.json();
    const status = json?.data?.status;
    return status === 1 || status === 2 || status === 3 ? status : "unknown";
  } catch {
    return "unreachable";
  }
}
