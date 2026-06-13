import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorovereenkomst",
  description:
    "Sponsorovereenkomst BréaTouch: pakketten Brons, Zilver en Goud, voordelen volgens fiche en aanvraagformulier.",
};

export default function SponsoringContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
