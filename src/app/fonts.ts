import { Inter, Rajdhani, Roboto_Mono } from "next/font/google";

// UI headings / labels — the slightly military-industrial feel.
export const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

// Body copy — kept readable at small sizes.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

// Numeric / data readouts (ISK values, timers, quantities).
export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-roboto-mono",
});
