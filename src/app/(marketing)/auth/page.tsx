"use client";

import { useEffect } from "react";

// registered as the EVE SSO callback in the dev portal - forwards to the real handler
export default function AuthCallbackPage() {
  useEffect(() => {
    window.location.replace(`/backend/cortex/auth/callback${window.location.search}`);
  }, []);

  return <p>Logging in…</p>;
}
