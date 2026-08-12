import type { Metadata } from "next";

import { AppShell } from "@/components/layout/AppShell";

import { inter, rajdhani, robotoMono } from "./fonts";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Nox Tools",
  description: "EVE Online tools",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${inter.variable} ${robotoMono.variable}`}
    >
      <body>
        <AppShell characterName="Blakjak">{children}</AppShell>
      </body>
    </html>
  );
}
