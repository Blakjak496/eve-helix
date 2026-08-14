import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },

  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.evetech.net" }],
  },

  // Proxies every backend call through nox-tools's own origin instead of
  // the browser talking to equinox-backend directly. This is what lets
  // Cortex's session cookie work as a plain SameSite=Lax cookie - from the
  // browser's point of view every request (including the SSO login/callback
  // redirects) stays same-origin, so there's no cross-site cookie problem
  // to solve with SameSite=None/Secure (which also wouldn't work over
  // plain http:// in local dev anyway).
  async rewrites() {
    const backendUrl = process.env.CORTEX_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("CORTEX_BACKEND_URL environment variable is not set");
    }

    return [
      {
        source: "/backend/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
