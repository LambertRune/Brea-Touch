import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroDecor}>
          <div className={styles.decorCircle1} />
          <div className={styles.decorCircle2} />
          <div className={styles.decorCircle3} />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroText}>
            <span className="badge badge--rose">Bewustwording</span>
            <h1 className={styles.heroTitle}>
              Make the touch matter
            </h1>
            <p className={styles.heroSubtitle}>
              BréaTouch helpt iedereen op een laagdrempelige en vertrouwde
              manier hun lichaam beter te leren kennen via een voeltool en
              duidelijke uitleg over zelfonderzoek tegen borstkanker. Zo maken we
              voelen eenvoudig, vertrouwd en waardevol.
            </p>
            <div className={styles.heroCta}>
              <Link href="/doe-mee" className="btn btn--primary btn--lg">
                Doe mee
              </Link>
              <Link href="/missie-visie" className="btn btn--secondary btn--lg">
                Onze missie
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <div className={styles.heroImageWrapper}>
              <Image
                src="/hero-group.png"
                alt="Het BréaTouch team – samen voor bewustwording"
                width={600}
                height={600}
                className={styles.heroImg}
                preload
              />
              <div className={styles.heroImageGlow} />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`section ${styles.stats}`} id="cijfers">
        <div className="container">
          <div className={styles.statsHeader}>
            <span className="badge badge--yellow">De cijfers</span>
            <h2>Waarom dit belangrijk is</h2>
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
      <section className={`section section--warm ${styles.about}`} id="over-ons">
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className="badge badge--sage">Wie wij zijn</span>
              <h2>Wij maken het verschil</h2>
              <div className="divider" />
              <p>
                Veel mensen weten niet hoe een knobbeltje in de borst eigenlijk
                voelt. En nog minder mensen weten dat ook mannen borstkanker
                kunnen krijgen. Daardoor wordt borstkanker vaak te laat ontdekt.
              </p>
              <p>
                Niet omdat mensen niet willen zorgen voor zichzelf, maar omdat ze
                simpelweg niet weten waar ze op moeten letten.
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
                  src="/product-sponge.png"
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
            <span className="badge badge--rose">De oplossing</span>
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
              <h3>Look</h3>
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
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h3>Feel</h3>
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
              <h3>Check</h3>
              <p>
                Merk je iets ongewoons? Neem contact op met je huisarts.
                Vroege detectie redt levens.
              </p>
            </div>
          </div>

          <div className={styles.productFeatures}>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}></div>
              <h4>Ergonomische borstvorm</h4>
              <p>Ontworpen om het zelfonderzoek zo realistisch mogelijk te maken.</p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}></div>
              <h4>Tastbaar tumorbolletje</h4>
              <p>
                Aan de zijkant van de spons zit een &apos;tumor&apos; bolletje zodat je
                leert herkennen wat je moet voelen.
              </p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}></div>
              <h4>Zachte structuur</h4>
              <p>
                Huidvriendelijk en geschikt voor dagelijks gebruik in je
                doucheroutine.
              </p>
            </div>
            <div className={`card ${styles.featureCard}`}>
              <div className={styles.featureIcon}></div>
              <h4>Visuele reminder</h4>
              <p>
                De spons herinnert je eraan om jezelf regelmatig te controleren.
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
          <h2>Wat anderen zeggen</h2>
          <div className="divider divider--center" />
          <div className={styles.testimonialGrid}>
            <div className={`card ${styles.testimonialCard}`}>
              <div className={styles.testimonialQuote}>&ldquo;</div>
              <p className={styles.testimonialText}>
                Dankzij BréaTouch weet ik eindelijk hoe ik mijn borsten goed
                kan controleren. Het voelde eerst gek, maar nu is het onderdeel
                van mijn routine.
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>S</div>
                <div>
                  <strong>Sophie, 24</strong>
                  <span className={styles.testimonialRole}>Gebruiker</span>
                </div>
              </div>
            </div>
            <div className={`card ${styles.testimonialCard}`}>
              <div className={styles.testimonialQuote}>&ldquo;</div>
              <p className={styles.testimonialText}>
                Als man wist ik niet dat ik ook risico liep op borstkanker. Dit
                initiatief doorbreekt het taboe en maakt bewustwording
                toegankelijk voor iedereen.
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>T</div>
                <div>
                  <strong>Thomas, 29</strong>
                  <span className={styles.testimonialRole}>Supporter</span>
                </div>
              </div>
            </div>
            <div className={`card ${styles.testimonialCard}`}>
              <div className={styles.testimonialQuote}>&ldquo;</div>
              <p className={styles.testimonialText}>
                Geweldig concept! De spons is kwalitatief en het idee erachter is
                briljant. Elke douche herinnert me eraan om even te checken.
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.testimonialAvatar}>L</div>
                <div>
                  <strong>Laura, 31</strong>
                  <span className={styles.testimonialRole}>Gebruiker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta} id="cta">
        <div className={styles.ctaPattern} />
        <div className={`container text-center ${styles.ctaContent}`}>
          <h2 className={styles.ctaTitle}>
            Samen maken we het verschil
          </h2>
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
