import type { Metadata } from "next";
import { ZelfonderzoekPage } from "./ZelfonderzoekPage";
import { getServerMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerMessages();
  return {
    title: t.zelfonderzoek.metaTitle,
    description: t.zelfonderzoek.metaDescription,
    alternates: { canonical: "/zelfonderzoek" },
  };
}

export default function Page() {
  return <ZelfonderzoekPage />;
}
