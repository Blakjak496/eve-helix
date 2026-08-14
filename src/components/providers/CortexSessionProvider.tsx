"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  fetchSession,
  logout as apiLogout,
  setActiveCharacter as apiSetActiveCharacter,
  unlinkCharacter as apiUnlinkCharacter,
  type CortexSession,
} from "@/lib/cortexApi";

type CortexSessionContextValue = {
  session: CortexSession | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  switchActiveCharacter: (characterId: string) => Promise<void>;
  unlinkCharacter: (characterId: string) => Promise<void>;
};

const CortexSessionContext = createContext<CortexSessionContextValue | null>(null);

export function CortexSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CortexSession | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const next = await fetchSession();
    setSession(next);
  }, []);

  useEffect(() => {
    // Guards against setting state after unmount, per React's own
    // documented pattern for data-fetching effects:
    // https://react.dev/learn/synchronizing-with-effects#fetching-data
    let ignore = false;

    fetchSession()
      .then((next) => {
        if (!ignore) setSession(next);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
    // Only on mount - callers that change session state (login redirect
    // landing, switch, unlink, logout) call refresh()/update state
    // themselves rather than relying on this effect re-running.
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setSession(null);
  }, []);

  const switchActiveCharacter = useCallback(
    async (characterId: string) => {
      await apiSetActiveCharacter(characterId);
      await refresh();
    },
    [refresh],
  );

  const unlinkCharacter = useCallback(
    async (characterId: string) => {
      const { loggedOut } = await apiUnlinkCharacter(characterId);
      if (loggedOut) {
        setSession(null);
      } else {
        await refresh();
      }
    },
    [refresh],
  );

  return (
    <CortexSessionContext.Provider
      value={{ session, loading, refresh, logout, switchActiveCharacter, unlinkCharacter }}
    >
      {children}
    </CortexSessionContext.Provider>
  );
}

export function useCortexSession(): CortexSessionContextValue {
  const ctx = useContext(CortexSessionContext);
  if (!ctx) throw new Error("useCortexSession must be used within a CortexSessionProvider");
  return ctx;
}
