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
  type HelixSession,
} from "@/lib/helixApi";

type HelixSessionContextValue = {
  session: HelixSession | null;
  loading: boolean;
  refresh: () => Promise<void>;
  logout: () => Promise<void>;
  switchActiveCharacter: (characterId: string) => Promise<void>;
  unlinkCharacter: (characterId: string) => Promise<void>;
};

const HelixSessionContext = createContext<HelixSessionContextValue | null>(
  null,
);

export function HelixSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<HelixSession | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const next = await fetchSession();
    setSession(next);
  }, []);

  useEffect(() => {
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
    <HelixSessionContext.Provider
      value={{
        session,
        loading,
        refresh,
        logout,
        switchActiveCharacter,
        unlinkCharacter,
      }}
    >
      {children}
    </HelixSessionContext.Provider>
  );
}

export function useHelixSession(): HelixSessionContextValue {
  const ctx = useContext(HelixSessionContext);
  if (!ctx)
    throw new Error(
      "useHelixSession must be used within a HelixSessionProvider",
    );
  return ctx;
}
