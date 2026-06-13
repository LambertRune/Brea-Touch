import Link from "next/link";
import { notFound } from "next/navigation";
import { RichTextViewer } from "@/components/RichTextViewer";
import { BrochurePhotoViewer } from "@/components/onderzoek/BrochurePhotoViewer";
import { getOnderzoekItemBySlug } from "@/lib/cms";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getOnderzoekItemBySlug(slug);
  if (!item) return { title: "Niet gevonden" };
  return {
    title: item.title,
    description: item.excerpt || undefined,
    alternates: { canonical: `/onderzoek/${slug}` },
  };
}

export default async function OnderzoekDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getOnderzoekItemBySlug(slug);
  if (!item) notFound();

  const isBrochure = item.kind === "brochure";

  return (
    <article className={`section ${styles.page}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/onderzoek" className={styles.back}>
          ← Terug naar onderzoek
        </Link>
        <div className={styles.meta}>
          <span className={`badge ${isBrochure ? "badge--sage" : "badge--yellow"}`}>
            {isBrochure ? "Brochure" : "Artikel"}
          </span>
          {item.language === "en" && (
            <span className={styles.lang}>English</span>
          )}
        </div>
        <h1>{item.title}</h1>
        {item.excerpt && <p className={styles.excerpt}>{item.excerpt}</p>}
        <div className="divider" />
        {isBrochure && item.brochure_file ? (
          <BrochurePhotoViewer fileId={item.brochure_file} alt={item.title} />
        ) : (
          <RichTextViewer html={item.body} />
        )}
      </div>
    </article>
  );
}
