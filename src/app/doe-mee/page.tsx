import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Doe Mee",
  description:
    "Doe mee met BréaTouch! Steun ons via een gift, vertel ons verhaal verder of word sponsor. Samen maken we het verschil in de strijd tegen borstkanker.",
};

export default function DoeMee() {
  return (
    <>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container text-center">
          <span className="badge badge--yellow">Doe mee</span>
          <h1>Iedereen kan iets betekenen</h1>
          <p className={styles.headerDesc}>
            Of je nu jong bent of al wat meer levenservaring hebt, jouw inzet
            telt. Samen maken we het verschil.
          </p>
        </div>
      </section>

      {/* Three Options */}
      <section className="section" id="opties">
        <div className="container">
          <div className={styles.options}>
            {/* Fund Me */}
            <div className={`card ${styles.optionCard} ${styles.optionFund}`}>
              <div className={styles.optionIconWrap}>
                <div className={`${styles.optionIcon} ${styles.optionIconFund}`}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
              </div>
              <div className={styles.optionLabel}>Doe een gift</div>
              <h3>Fund me</h3>
              <p>
                Met jouw gift, groot of klein, geef je onze onderneming de
                kracht om verder te groeien en meer impact te maken.
              </p>
              <Link href="/contact" className="btn btn--primary">
                Steun ons
              </Link>
            </div>

            {/* Vertel het verder */}
            <div className={`card ${styles.optionCard} ${styles.optionShare}`}>
              <div className={styles.optionIconWrap}>
                <div className={`${styles.optionIcon} ${styles.optionIconShare}`}>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
              </div>
              <div className={styles.optionLabel}>Deel ons verhaal</div>
              <h3>Vertel het verder</h3>
              <p>
                Roddel hoeft niet slecht te zijn, deel ons verhaal en laat dit
                krachtige verhaal de ronde gaan. Door het gewoon door te
                vertellen, kan jij echt impact hebben op iemand anders leven.
              </p>
              <div className={styles.socialShare}>
                <a
                  href="https://www.instagram.com/breatouch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Deel op Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.tiktok.com/@breatouch?_r=1&_t=ZG-957Tpu0syAq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="Volg op TikTok"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.14a8.16 8.16 0 0 0 3.76.92V6.69z" />
                  </svg>
                  TikTok
                </a>
              </div>
            </div>

            {/* Sponsoring */}
            <div className={`card ${styles.optionCard} ${styles.optionSponsor}`}>
              <div className={styles.optionIconWrap}>
                <div
                  className={`${styles.optionIcon} ${styles.optionIconSponsor}`}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </div>
              </div>
              <div className={styles.optionLabel}>Voor bedrijven</div>
              <h3>Sponsoring</h3>
              <p>
                Ook bedrijven kunnen een belangrijke rol spelen. Door ons te
                ondersteunen als sponsor, help je onze onderneming verder
                groeien en meer mensen bereiken – samen werken we aan een
                duurzame impact.
              </p>
              <Link href="/contact" className="btn btn--outline">
                Word sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Samenwerking */}
      <section className="section section--warm" id="samenwerking">
        <div className="container">
          <div className={styles.collab}>
            <div className={styles.collabContent}>
              <span className="badge badge--sage">Samenwerking</span>
              <h2>Win-win partnerschappen</h2>
              <div className="divider" />
              <p>
                BréaTouch kiest ervoor om samen te werken met bestaande
                producenten van douche- en verzorgingsproducten. In plaats van
                alles zelf te ontwikkelen, willen we partnerschappen aangaan met
                merken die reeds kwalitatieve producten aanbieden.
              </p>
              <div className={styles.collabBenefits}>
                <div className={styles.benefit}>
                  <div className={styles.benefitCheck}>✓</div>
                  <div>
                    <strong>Hogere productkwaliteit</strong>
                    <p>Door samenwerking met ervaren merken</p>
                  </div>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.benefitCheck}>✓</div>
                  <div>
                    <strong>Snellere lancering</strong>
                    <p>Op de markt dankzij bestaande infrastructuur</p>
                  </div>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.benefitCheck}>✓</div>
                  <div>
                    <strong>Grotere aantrekkelijkheid</strong>
                    <p>
                      Een totaalervaring waarbij verzorging en bewustwording
                      samenkomen
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.collabVisual}>
              <div className={styles.conceptCard}>
                <h4>Concept</h4>
                <ul>
                  <li>Integratie staaltjes douchegel of verzorgingsproducten</li>
                  <li>Verkoop in combinatie met de BréaTouch spons</li>
                  <li>Totaalervaring: verzorging + bewustwording</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Placeholder */}
      <section className="section" id="sponsors">
        <div className="container text-center">
          <span className="badge badge--yellow">Sponsors</span>
          <h2 style={{ marginTop: "var(--space-md)" }}>Onze sponsors</h2>
          <div className="divider divider--center" />
          <div className={styles.sponsorsPlaceholder}>
            <p>
              Wordt jouw bedrijf hier vermeld? Neem contact met ons op en
              ontdek de mogelijkheden.
            </p>
            <Link href="/contact" className="btn btn--primary">
              Word sponsor →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
