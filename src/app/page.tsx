import Image from "next/image";
import Link from "next/link";
import { ArrowBigDown } from "lucide-react";
import { HeroAnimatedTitles } from "@/components/HeroAnimatedTitles";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <HeroAnimatedTitles />
          </div>
        </div>
        <a
          href="#cijfers"
          className={styles.heroScrollHint}
          aria-label="Scroll naar de cijfers"
        >
          <ArrowBigDown
            className={styles.heroScrollIcon}
            strokeWidth={1.75}
            aria-hidden
          />
        </a>
      </section>

      {/* Stats Section */}
      <section className={`section ${styles.stats}`} id="cijfers">
        <div className="container">
          <div className={styles.statsHeader}>
            <span className="badge badge--yellow">De cijfers</span>
            <h2>Waarom vindt BréaTouch dit belangrijk</h2>
            <div className="divider divider--center" />
          </div>
          <div className={`grid grid--3 ${styles.statsGrid}`}>
            <div className={`card stat-card ${styles.statItem}`}>
              <div className="stat-card__number">11.000</div>
              <div className="stat-card__label">
                Jaarlijkse diagnoses borstkanker bij vrouwen in België.
              </div>
            </div>
            <div className={`card stat-card ${styles.statItem}`}>
              <div className="stat-card__number">103</div>
              <div className="stat-card__label">
                Jaarlijkse diagnoses borstkanker bij mannen in België.
              </div>
            </div>
            <div className={`card stat-card ${styles.statItem}`}>
              <div className="stat-card__number">1 op 5</div>
              <div className="stat-card__label">
                Diagnoses borstkanker worden pas in een later stadium (3 of 4)
                vastgesteld.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Portfolio Section */}
      <section
        className={`section section--warm ${styles.about}`}
        id="over-ons"
      >
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className="badge badge--sage">Wie wij zijn</span>
              <h2>BréaTouch maakt het verschil</h2>
              <div className="divider" />
              <p>
                Veel mensen weten niet hoe een knobbeltje in de borst eigenlijk
                voelt. En nog minder mensen weten dat ook mannen borstkanker
                kunnen krijgen. Daardoor wordt borstkanker vaak te laat ontdekt.
              </p>
              <p>
                Niet omdat mensen niet willen zorgen voor zichzelf, maar omdat
                ze simpelweg niet weten waar ze op moeten letten.
              </p>
              <p>
                Bij BréaTouch willen we dat veranderen. Wij geloven dat
                bewustwording pas echt werkt als je het kan voelen, begrijpen en
                herkennen.
              </p>
              <Link href="/missie-visie" className="btn btn--outline">
                Lees meer over onze missie →
              </Link>
            </div>
            <div className={styles.aboutVisual}>
              <div className={styles.aboutCard}>
                <Image
                  src="/pictures/Coming-soon.jpg"
                  alt="BréaTouch douchespons – voeltool voor zelfonderzoek"
                  width={500}
                  height={500}
                  className={styles.aboutImage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product / Solution Section */}
      <section className={`section ${styles.solution}`} id="oplossing">
        <div className="container">
          <div className="text-center">
            <span className="badge badge--rose">Hulpmiddel</span>
            <h2>BréaTouch douchespons</h2>
            <div className="divider divider--center" />
            <p
              className="text-muted"
              style={{ maxWidth: "640px", margin: "0 auto var(--space-3xl)" }}
            >
              BréaTouch combineert dagelijkse verzorging met bewustwording. Onze
              douchespons maakt zelfonderzoek een intuïtief onderdeel van je
              routine.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={`${styles.stepIcon} ${styles.stepIconLook}`}>
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
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h3>Kijk</h3>
              <p>
                Kijk naar je borsten in de spiegel. Let op veranderingen in
                vorm, grootte of huid.
              </p>
            </div>
            <div className={styles.stepConnector}>
              <svg width="40" height="2" viewBox="0 0 40 2">
                <line
                  x1="0"
                  y1="1"
                  x2="40"
                  y2="1"
                  stroke="var(--color-border)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
            <div className={styles.step}>
              <div className={`${styles.stepIcon} ${styles.stepIconFeel}`}>
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
                  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
                  <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
                  <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
                  <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
                </svg>
              </div>
              <h3>Voel</h3>
              <p>
                Voel met je vingertoppen. De spons helpt je herkennen hoe een
                knobbeltje aanvoelt.
              </p>
            </div>
            <div className={styles.stepConnector}>
              <svg width="40" height="2" viewBox="0 0 40 2">
                <line
                  x1="0"
                  y1="1"
                  x2="40"
                  y2="1"
                  stroke="var(--color-border)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </div>
            <div className={styles.step}>
              <div className={`${styles.stepIcon} ${styles.stepIconCheck}`}>
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
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Begrijp</h3>
              <p>
                Merk je iets ongewoons? Neem contact op met je huisarts. Vroege
                detectie redt levens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getuigenissen / Testimonials Section */}
      <section
        className={`section section--alt ${styles.testimonials}`}
        id="getuigenissen"
      >
        <div className="container text-center">
          <span className="badge badge--rose">Getuigenissen</span>
          <h2>Persoonlijke verhalen</h2>
          <div className="divider divider--center" />
          <div className={styles.testimonialGrid}>
            <div className={`card ${styles.testimonialCard}`}>
              <div className={styles.testimonialQuote} aria-hidden="true">
                &ldquo;
              </div>
              <p className={styles.testimonialText}>
                Dankzij BréaTouch weet ik eindelijk hoe ik mijn borsten goed kan
                controleren. Het voelde eerst gek, maar nu is het onderdeel van
                mijn routine.
              </p>
              <div className={styles.testimonialQuoteEnd} aria-hidden="true">
                &rdquo;
              </div>
            </div>
            <div className={`card ${styles.testimonialCard}`}>
              <div className={styles.testimonialQuote} aria-hidden="true">
                &ldquo;
              </div>
              <p className={styles.testimonialText}>
                Als man wist ik niet dat ik ook risico liep op borstkanker. Dit
                initiatief doorbreekt het taboe en maakt bewustwording
                toegankelijk voor iedereen.
              </p>
              <div className={styles.testimonialQuoteEnd} aria-hidden="true">
                &rdquo;
              </div>
            </div>
            <div className={`card ${styles.testimonialCard}`}>
              <div className={styles.testimonialQuote} aria-hidden="true">
                &ldquo;
              </div>
              <p className={styles.testimonialText}>
                Geweldig concept! De spons is kwalitatief en het idee erachter
                is briljant. Elke douche herinnert me eraan om even te checken.
              </p>
              <div className={styles.testimonialQuoteEnd} aria-hidden="true">
                &rdquo;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} id="cta">
        <div className={styles.ctaPattern} />
        <div className={`container text-center ${styles.ctaContent}`}>
          <h2 className={styles.ctaTitle}>Samen maken we het verschil</h2>
          <p className={styles.ctaText}>
            Iedereen kan iets betekenen. Of je nu jong bent of al wat meer
            levenservaring hebt, jouw inzet telt.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/doe-mee" className="btn btn--primary btn--lg">
              Doe mee
            </Link>
            <Link href="/contact" className="btn btn--secondary btn--lg">
              Neem contact op
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
