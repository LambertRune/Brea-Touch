import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} id="site-footer">
      <div className={styles.footerTop}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="18" height="18" rx="9" fill="#715b52" />
                <rect x="22" width="18" height="18" rx="5" fill="#b2a952" />
                <rect y="22" width="18" height="18" rx="5" fill="#a3b0ad" />
                <circle cx="31" cy="31" r="9" fill="#d8ad9b" />
              </svg>
              <span className={styles.logoText}>BréaTouch</span>
            </Link>
            <p className={styles.tagline}>
              Make the touch matter
            </p>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>Navigatie</h4>
            <Link href="/" className={styles.footerLink}>Home</Link>
            <Link href="/missie-visie" className={styles.footerLink}>Missie & Visie</Link>
            <Link href="/doe-mee" className={styles.footerLink}>Doe Mee</Link>
            <Link href="/contact" className={styles.footerLink}>Contact</Link>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>Contact</h4>
            <a href="mailto:breatouch@outlook.com" className={styles.footerLink}>
              breatouch@outlook.com
            </a>
          </div>

          <div className={styles.footerLinks}>
            <h4 className={styles.footerTitle}>Volg ons</h4>
            <div className={styles.socials}>
              <a
                href="https://www.instagram.com/breatouch"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Instagram"
                id="footer-instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.88-2.89 2.89 2.89 0 0 1 2.88-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.14a8.16 8.16 0 0 0 3.76.92V6.69z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className="container">
          <p className={styles.copyright}>
            © {new Date().getFullYear()} BréaTouch. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
}
