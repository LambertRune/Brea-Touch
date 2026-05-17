import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsorovereenkomst",
  description:
    "Sponsorovereenkomst BréaTouch: pakketten Supporter, Brons, Zilver en goud, voordelen volgens fiche en aanvraagformulier.",
};

export default function SponsoringContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
