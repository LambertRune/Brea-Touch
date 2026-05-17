import { Plus_Jakarta_Sans, Nunito, League_Gothic } from "next/font/google";

// Plus Jakarta Sans for body text
export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

// Nunito as a similar rounded font to Scale VF for titles
// Nunito has the rounded, friendly character similar to Scale VF
export const headingFont = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
  weight: ["400", "600", "700", "800", "900"],
});

export const leagueGothic = League_Gothic({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hero-title",
  weight: "400",
});
