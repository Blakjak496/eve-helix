import type { Metadata } from "next";

import { HelixSessionProvider } from "@/components/providers/HelixSessionProvider";

import { inter, rajdhani, robotoMono } from "./fonts";
import "./globals.scss";

export const metadata: Metadata = {
  title: "EVE Helix",
  description: "EVE Online Companion Tools",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${inter.variable} ${robotoMono.variable}`}
    >
      <body>
        <HelixSessionProvider>{children}</HelixSessionProvider>
      </body>
    </html>
  );
}
