import type { Metadata } from "next";
import { plusJakartaSans, headingFont, leagueGothic } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BréaTouch – Make the touch matter",
    template: "%s | BréaTouch",
  },
  description:
    "BréaTouch helpt iedereen op een laagdrempelige en vertrouwde manier hun lichaam beter te leren kennen via een voeltool en duidelijke uitleg over zelfonderzoek tegen borstkanker.",
  keywords: [
    "borstkanker",
    "zelfonderzoek",
    "bewustwording",
    "vroege detectie",
    "BréaTouch",
    "douchespons",
    "breast cancer awareness",
  ],
  openGraph: {
    title: "BréaTouch – Make the touch matter",
    description:
      "BréaTouch maakt zelfonderzoek eenvoudig, vertrouwd en waardevol. Samen maken we het verschil.",
    type: "website",
    locale: "nl_BE",
  },
  manifest: null,
  appleWebApp: false,
  icons: {
    icon: "/pictures/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${plusJakartaSans.variable} ${headingFont.variable} ${leagueGothic.variable}`}
    >
      <body>
        <ScrollToTop />
        <SiteChrome header={<Header />} footer={<Footer />}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
