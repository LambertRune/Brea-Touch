import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onderzoek",
  description:
    "Brochures en artikelen over borstkankerpreventie, zelfonderzoek en bewustwording van BréaTouch.",
  alternates: { canonical: "/onderzoek" },
};

export default function OnderzoekLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
