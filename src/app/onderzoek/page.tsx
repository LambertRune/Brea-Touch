import Link from "next/link";
import { getPublishedOnderzoekItems } from "@/lib/cms";
import type { OnderzoekItem, OnderzoekKind } from "@/lib/directus";
import styles from "./page.module.css";

const KIND_LABEL: Record<OnderzoekKind, string> = {
  brochure: "Brochure",
  article: "Artikel",
};

function kindBadgeClass(kind: OnderzoekKind): string {
  return kind === "brochure" ? styles.badgeBrochure : styles.badgeArticle;
}

function OnderzoekCard({ item }: { item: OnderzoekItem }) {
  return (
    <Link href={`/onderzoek/${item.slug}`} className={`card ${styles.card}`}>
      <div className={styles.cardMeta}>
        <span className={`${styles.badge} ${kindBadgeClass(item.kind)}`}>
          {KIND_LABEL[item.kind]}
        </span>
        {item.language === "en" && (
          <span className={styles.langBadge}>EN</span>
        )}
      </div>
      <h2 className={styles.cardTitle}>{item.title}</h2>
      {item.excerpt && <p className={styles.cardExcerpt}>{item.excerpt}</p>}
      <span className={styles.cardLink}>Bekijk →</span>
    </Link>
  );
}

export default async function OnderzoekPage() {
  const items = await getPublishedOnderzoekItems();

  return (
    <>
      <section className={styles.pageHeader}>
        <div className="container text-center">
          <span className="badge badge--yellow">Onderzoek</span>
          <h1>Kennis &amp; materialen</h1>
          <p className={styles.headerDesc}>
            Brochures en artikelen over zelfonderzoek, bewustwording en
            borstkankerpreventie.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {items.length === 0 ? (
            <p className={styles.empty}>
              Er staan nog geen onderzoeksmaterialen online. Kom later terug.
            </p>
          ) : (
            <div className={styles.grid}>
              {items.map((item) => (
                <OnderzoekCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
