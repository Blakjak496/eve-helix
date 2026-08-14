"use client";

import { useEffect } from "react";

// Registered as the EVE SSO callback in the dev portal
// (https://evecortex.web.app/auth) - CCP redirects the browser here with
// ?code&state (or ?error on denial), not to the backend directly. This
// just forwards that query string on to the backend's actual callback
// handler via the same-origin proxy (see next.config.ts), so the
// short-lived oauth-state cookie set when the login/link flow started is
// still attached when it arrives there.
export default function AuthCallbackPage() {
  useEffect(() => {
    window.location.replace(`/backend/cortex/auth/callback${window.location.search}`);
  }, []);

  return <p>Logging in…</p>;
}
