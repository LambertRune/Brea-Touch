import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met BréaTouch. Stuur ons een bericht, volg ons op Instagram, TikTok en LinkedIn, of mail naar breatouch@outlook.com.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
