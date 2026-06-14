import { Suspense } from "react";
import Link from "next/link";
import SponsoringForm from "./SponsoringForm";
import {
  TierIconClover,
  TierIconDiamondsPair,
  TierIconGem,
} from "./SponsoringFicheVisuals";
import { getServerMessages } from "@/lib/i18n/server";
import styles from "./page.module.css";

const TIER_CONFIG = [
  { key: "brons" as const, formValue: "Brons", className: styles.tierBrons, Icon: TierIconClover },
  { key: "zilver" as const, formValue: "Zilver", className: styles.tierZilver, Icon: TierIconDiamondsPair },
  { key: "goud" as const, formValue: "Goud", className: styles.tierGoud, Icon: TierIconGem },
];

export default async function SponsorovereenkomstPage() {
  const t = await getServerMessages();

  return (
    <>
      <section className={styles.pageHeader}>
        <div className="container text-center">
          <span className="badge badge--yellow">{t.sponsor.badge}</span>
          <h1>{t.sponsor.title}</h1>
          <p className={styles.headerDesc}>{t.sponsor.headerDesc}</p>
        </div>
      </section>

      <section className="section" id="sponsor-fiche">
        <div className="container">
          <div className={styles.ficheWrap}>
            <div className={styles.tierGrid}>
              {TIER_CONFIG.map(({ key, formValue, className, Icon }) => {
                const tier = t.sponsor.tiers[key];
                return (
                  <article
                    key={formValue}
                    className={`${styles.tierCard} ${className}`}
                  >
                    <div className={styles.tierIcon} aria-hidden="true">
                      <Icon />
                    </div>
                    <h2>{tier.title}</h2>
                    <p className={styles.tierPrice}>{tier.price}</p>
                    <p className={styles.tierLabel}>{t.sponsor.whatYouGet}</p>
                    <ul className={styles.tierList}>
                      {tier.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="sponsor-form">
        <div className="container">
          <Suspense fallback={null}>
            <SponsoringForm />
          </Suspense>
          <p className={styles.formBottomLink}>
            <Link href="/contact" className="btn btn--outline">
              {t.sponsor.generalContact}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
