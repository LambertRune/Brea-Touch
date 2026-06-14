import type { Metadata } from "next";
import { getServerMessages } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerMessages();
  return {
    title: t.sponsor.metaTitle,
    description: t.sponsor.metaDescription,
  };
}

export default function SponsoringContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
