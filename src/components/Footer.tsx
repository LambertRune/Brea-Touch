import Link from "next/link";
import { Heart } from "lucide-react";
import { getPublishedLegalPages } from "@/lib/cms";
import { getServerMessages } from "@/lib/i18n/server";
import styles from "./Footer.module.css";

export default async function Footer() {
  const t = await getServerMessages();
  const legalPages = await getPublishedLegalPages();
  const pages = Array.isArray(legalPages) ? legalPages : [];

  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.footerTop}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>{t.common.followUs}</h4>
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/breatouch"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
                id="footer-instagram"
              >
                <svg
                  width="22"
                  height="22"
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
              </a>
              <a
                href="https://www.tiktok.com/@breatouch?_r=1&_t=ZG-957Tpu0syAq"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok"
                id="footer-tiktok"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.14a8.16 8.16 0 0 0 3.76.92V6.69z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/bréatouch-borstkankerpreventie-8797093b9"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
                id="footer-linkedin"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                </svg>
              </a>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>{t.common.navigation}</h4>
            <Link href="/" className={styles.footerLink}>
              {t.nav.home}
            </Link>
            <Link href="/missie-visie" className={styles.footerLink}>
              {t.nav.mission}
            </Link>
            <Link href="/zelfonderzoek" className={styles.footerLink}>
              {t.nav.selfExam}
            </Link>
            <Link href="/doe-mee" className={styles.footerLink}>
              {t.nav.join}
            </Link>
            <Link href="/sponsoring-contact" className={styles.footerLink}>
              {t.nav.sponsor}
            </Link>
            <Link href="/contact" className={styles.footerLink}>
              {t.nav.contact}
            </Link>
          </div>
          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>{t.common.legalInfo}</h4>
            {pages.length === 0 ? (
              <span className={styles.footerMuted}>{t.common.noLegalPages}</span>
            ) : (
              pages.map((page) => (
                <Link
                  key={page.id}
                  href={`/voorwaarden/${page.slug}`}
                  className={styles.footerLink}
                >
                  {page.title}
                </Link>
              ))
            )}
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>{t.common.contact}</h4>
            <a
              href="mailto:breatouch@outlook.com"
              className={styles.footerLink}
            >
              breatouch@outlook.com
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomInner}`}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} BréaTouch. {t.common.copyright}
          </p>
          <Link href="/admin/login" className={styles.adminLink}>
            {t.common.admin}
          </Link>
        </div>
        <p className={styles.footerCredit}>
          {t.common.madeWith}{" "}
          <Heart
            className={styles.heart}
            size={18}
            fill="currentColor"
            strokeWidth={1.5}
            aria-hidden
          />{" "}
          {t.common.by}{" "}
          <a
            href="https://phiosk.be"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.creditLink}
          >
            Phiosk Development
          </a>
        </p>
      </div>
    </footer>
  );
}
