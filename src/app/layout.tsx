import type { Metadata } from "next";

import { CortexSessionProvider } from "@/components/providers/CortexSessionProvider";

import { inter, rajdhani, robotoMono } from "./fonts";
import "./globals.scss";

export const metadata: Metadata = {
  title: "EVE Cortex",
  description: "EVE Online Companion Tools",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${inter.variable} ${robotoMono.variable}`}
    >
      <body>
        <CortexSessionProvider>{children}</CortexSessionProvider>
      </body>
    </html>
  );
}
