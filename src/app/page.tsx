import Image from "next/image";
import Link from "next/link";
import { ArrowBigDown } from "lucide-react";
import { HeroAnimatedTitles } from "@/components/HeroAnimatedTitles";
import { RichTextViewer } from "@/components/RichTextViewer";
import {
  getImageUrl,
  getPublishedTestimonials,
  getSiteSettings,
} from "@/lib/cms";
import { getServerMessages } from "@/lib/i18n/server";
import styles from "./page.module.css";

export default async function Home() {
  const t = await getServerMessages();
  const [settings, testimonials] = await Promise.all([
    getSiteSettings(),
    getPublishedTestimonials(),
  ]);

  const aboutImage =
    getImageUrl(settings?.about_image, "width=500&height=500&fit=cover") ||
    "/pictures/Coming-soon.jpg";
  const aboutIsRemote = aboutImage.startsWith("http");

  const stories =
    testimonials.length > 0
      ? testimonials
      : t.home.fallbackTestimonials.map((quote, i) => ({
          id: i,
          quote,
          sort: i,
          status: "published",
        }));

  return (
    <>
      <section className={styles.hero} id="hero">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <HeroAnimatedTitles />
          </div>
        </div>
        <a
          href="#cijfers"
          className={styles.heroScrollHint}
          aria-label={t.common.scrollToStats}
        >
          <ArrowBigDown
            className={styles.heroScrollIcon}
            strokeWidth={1.75}
            aria-hidden
          />
        </a>
      </section>

      <section className={`section ${styles.stats}`} id="cijfers">
        <div className="container">
          <div className={styles.statsHeader}>
            <span className="badge badge--yellow">{t.home.statsBadge}</span>
            <h2>{t.home.statsTitle}</h2>
            <div className="divider divider--center" />
          </div>
          <div className={`grid grid--3 ${styles.statsGrid}`}>
            <div className={`card stat-card ${styles.statItem}`}>
              <div className="stat-card__number">11.000</div>
              <div className="stat-card__label">{t.home.stat1Label}</div>
            </div>
            <div className={`card stat-card ${styles.statItem}`}>
              <div className="stat-card__number">103</div>
              <div className="stat-card__label">{t.home.stat2Label}</div>
            </div>
            <div className={`card stat-card ${styles.statItem}`}>
              <div className="stat-card__number">1 op 5</div>
              <div className="stat-card__label">{t.home.stat3Label}</div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`section section--warm ${styles.about}`}
        id="over-ons"
      >
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className="badge badge--sage">{t.home.aboutBadge}</span>
              <h2>{t.home.aboutTitle}</h2>
              <div className="divider" />
              {settings?.about_body ? (
                <RichTextViewer
                  html={settings.about_body}
                  className={styles.aboutRichText}
                />
              ) : (
                t.home.fallbackAbout.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))
              )}
              <Link href="/missie-visie" className="btn btn--outline">
                {t.home.aboutCta}
              </Link>
            </div>
            <div className={styles.aboutVisual}>
              <div className={styles.aboutCard}>
                <Image
                  src={aboutImage}
                  alt={t.home.aboutImageAlt}
                  width={500}
                  height={500}
                  className={styles.aboutImage}
                  unoptimized={aboutIsRemote}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.solution}`} id="oplossing">
        <div className="container">
          <div className="text-center">
            <span className="badge badge--rose">{t.home.solutionBadge}</span>
            <h2>{t.home.solutionTitle}</h2>
            <div className="divider divider--center" />
            <p
              className="text-muted"
              style={{ maxWidth: "640px", margin: "0 auto var(--space-3xl)" }}
            >
              {t.home.solutionDesc}
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
              <h3>{t.home.stepLookTitle}</h3>
              <p>{t.home.stepLookDesc}</p>
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
              <h3>{t.home.stepFeelTitle}</h3>
              <p>{t.home.stepFeelDesc}</p>
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
              <h3>{t.home.stepUnderstandTitle}</h3>
              <p>{t.home.stepUnderstandDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`section section--alt ${styles.testimonials}`}
        id="getuigenissen"
      >
        <div className="container text-center">
          <span className="badge badge--rose">{t.home.testimonialsBadge}</span>
          <h2>{t.home.testimonialsTitle}</h2>
          <div className="divider divider--center" />
          <div className={styles.testimonialGrid}>
            {stories.map((item) => (
              <div key={item.id} className={`card ${styles.testimonialCard}`}>
                <div className={styles.testimonialQuote} aria-hidden="true">
                  &ldquo;
                </div>
                <RichTextViewer
                  html={item.quote}
                  className={styles.testimonialText}
                />
                <div className={styles.testimonialQuoteEnd} aria-hidden="true">
                  &rdquo;
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} id="cta">
        <div className={styles.ctaPattern} />
        <div className={`container text-center ${styles.ctaContent}`}>
          <h2 className={styles.ctaTitle}>{t.home.ctaTitle}</h2>
          <p className={styles.ctaText}>{t.home.ctaText}</p>
          <div className={styles.ctaButtons}>
            <Link href="/doe-mee" className="btn btn--primary btn--lg">
              {t.home.ctaJoin}
            </Link>
            <Link href="/contact" className="btn btn--secondary btn--lg">
              {t.home.ctaContact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
