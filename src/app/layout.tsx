import type { Metadata } from "next";
import { plusJakartaSans, headingFont, leagueGothic } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SiteChrome } from "@/components/SiteChrome";
import ScrollToTop from "@/components/ScrollToTop";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getServerLocale, getServerMessages } from "@/lib/i18n/server";
import "./globals.css";

/** Altijd runtime CMS (Docker build heeft vaak geen DIRECTUS_TOKEN). */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerMessages();
  const locale = await getServerLocale();
  const ogLocale =
    locale === "fr" ? "fr_BE" : locale === "en" ? "en_BE" : "nl_BE";

  return {
    title: {
      default: t.meta.siteTitle,
      template: `%s | BréaTouch`,
    },
    description: t.meta.siteDescription,
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
      title: t.meta.siteTitle,
      description: t.meta.ogDescription,
      type: "website",
      locale: ogLocale,
    },
    manifest: null,
    appleWebApp: false,
    icons: {
      icon: "/pictures/favicon.webp",
    },
  };
}

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
        <LocaleProvider>
          <SiteChrome header={<Header />} footer={<Footer />}>
            {children}
          </SiteChrome>
        </LocaleProvider>
      </body>
    </html>
  );
}
