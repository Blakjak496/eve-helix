import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Nox Tools",
  description: "EVE Online tools",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
