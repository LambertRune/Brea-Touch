import type { Metadata } from "next";
import Link from "next/link";
import { SponsorHoneycomb } from "@/components/sponsors/SponsorHoneycomb";
import { getPublishedSponsors } from "@/lib/cms";
import { getServerMessages } from "@/lib/i18n/server";
import { mapSponsorsToHoneycomb } from "@/lib/sponsors";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerMessages();
  return {
    title: t.join.metaTitle,
    description: t.join.metaDescription,
  };
}

export default async function DoeMee() {
  const t = await getServerMessages();
  const sponsors = mapSponsorsToHoneycomb(await getPublishedSponsors());

  return (
    <>
      <section className={styles.pageHeader}>
        <div className="container text-center">
          <span className="badge badge--yellow">{t.join.badge}</span>
          <h1>{t.join.title}</h1>
          <p className={styles.headerDesc}>{t.join.headerDesc}</p>
        </div>
      </section>

      <section className="section" id="opties">
        <div className="container">
          <div className={styles.options}>
            <div className={`card ${styles.optionCard} ${styles.optionShare}`}>
              <div className={styles.optionIconWrap}>
                <div
                  className={`${styles.optionIcon} ${styles.optionIconShare}`}
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
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </div>
              </div>
              <div className={styles.optionLabel}>{t.join.shareLabel}</div>
              <h3>{t.join.shareTitle}</h3>
              <p>{t.join.shareDesc}</p>
              <div className={styles.socialShare}>
                <a
                  href="https://www.instagram.com/breatouch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={t.common.shareOnInstagram}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  aria-label={t.common.followOnTikTok}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.14a8.16 8.16 0 0 0 3.76.92V6.69z" />
                  </svg>
                  TikTok
                </a>
                <a
                  href="https://www.linkedin.com/in/bréatouch-borstkankerpreventie-8797093b9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label={t.common.onLinkedIn}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div
              className={`card ${styles.optionCard} ${styles.optionSponsor}`}
            >
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
                    aria-hidden
                  >
                    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                    <path d="m21 3 1 11h-2" />
                    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                    <path d="M3 4h8" />
                  </svg>
                </div>
              </div>
              <div className={styles.optionLabel}>{t.join.sponsorLabel}</div>
              <h3>{t.join.sponsorTitle}</h3>
              <p>{t.join.sponsorDesc}</p>
              <Link href="/sponsoring-contact" className="btn btn--outline">
                {t.join.sponsorCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.sponsors}`} id="sponsors">
        <div className="container text-center">
          <span className="badge badge--yellow">{t.join.sponsorsBadge}</span>
          <h2 style={{ marginTop: "var(--space-md)" }}>
            {t.join.sponsorsTitle}
          </h2>
          <div className="divider divider--center" />
          <div className={styles.sponsorsPlaceholder}>
            {sponsors.length > 0 && (
              <SponsorHoneycomb
                sponsors={sponsors}
                embedded
                ariaLabel={t.common.ourSponsors}
              />
            )}
            <p>{t.join.sponsorsDesc}</p>
            <Link href="/sponsoring-contact" className="btn btn--primary">
              {t.join.sponsorsCta}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
