import { Suspense } from "react";
import Link from "next/link";
import SponsoringForm from "./SponsoringForm";
import styles from "./page.module.css";
import SupporterGoFundMe from "./SupporterGoFundMe";
import {
  TierIconClover,
  TierIconDiamondsPair,
  TierIconGem,
  TierIconHeart,
} from "./SponsoringFicheVisuals";

const TIERS = [
  {
    title: "Supporter",
    price: "Vrije bijdrage",
    className: styles.tierSupporter,
    formValue: "Supporter",
    features: ["Bedankingsmail"],
    showQr: true,
    Icon: TierIconHeart,
  },
  {
    title: "Brons",
    price: "Vanaf €50",
    className: styles.tierBrons,
    formValue: "Brons",
    features: ["Vermelding van klein logo op de website"],
    showQr: false,
    Icon: TierIconClover,
  },
  {
    title: "Zilver",
    price: "Vanaf €200",
    className: styles.tierZilver,
    formValue: "Zilver",
    features: [
      "Vermelding van klein logo op de website",
      "Vermelding op LinkedIn",
      "Vermelding op instagram",
    ],
    showQr: false,
    Icon: TierIconDiamondsPair,
  },
  {
    title: "GOUD",
    price: "Vanaf €500",
    className: styles.tierGoud,
    formValue: "Goud",
    features: [
      "Grote vermelding op website",
      "Vermelding op offline campagnemateriaal",
      "Sociale media post",
    ],
    showQr: false,
    Icon: TierIconGem,
  },
] as const;

export default function SponsorovereenkomstPage() {
  return (
    <>
      <section className={styles.pageHeader}>
        <div className="container text-center">
          <span className="badge badge--yellow">Sponsorovereenkomst</span>
          <h1>Sponsoring</h1>
          <p className={styles.headerDesc}>
            Word sponsor van BréaTouch en maak samen met ons zelfonderzoek
            toegankelijk voor iedereen.
          </p>
        </div>
      </section>

      <section className="section" id="sponsor-fiche">
        <div className="container">
          <div className={styles.ficheWrap}>
            <div className={styles.tierGrid}>
              {TIERS.map((tier) => {
                const Icon = tier.Icon;
                return (
                  <article
                    key={tier.formValue}
                    className={`${styles.tierCard} ${tier.className}`}
                  >
                    <div className={styles.tierIcon} aria-hidden="true">
                      <Icon />
                    </div>
                    <h2
                      className={
                        tier.title === "GOUD" ? styles.tierTitleGoud : undefined
                      }
                    >
                      {tier.title}
                    </h2>
                    <p className={styles.tierPrice}>{tier.price}</p>
                    <p className={styles.tierLabel}>Wat krijg je?</p>
                    <ul className={styles.tierList}>
                      {tier.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    {tier.showQr && <SupporterGoFundMe />}
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
              Algemeen contact
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
