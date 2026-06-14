"use client";

import { useLocale } from "@/components/LocaleProvider";
import { BROCHURE_BY_LOCALE } from "@/lib/i18n/brochures";
import styles from "./page.module.css";

export function ZelfonderzoekPage() {
  const { locale, t } = useLocale();
  const brochure = BROCHURE_BY_LOCALE[locale];

  return (
    <section className={`section ${styles.download}`}>
      <div className={`container ${styles.downloadInner}`}>
        <h1>{t.zelfonderzoek.downloadTitle}</h1>
        <p className={styles.downloadDesc}>{t.zelfonderzoek.downloadDescription}</p>
        <a
          href={brochure.href}
          download={brochure.filename}
          className={`btn btn--primary ${styles.downloadBtn}`}
        >
          {t.zelfonderzoek.downloadButton}
        </a>
      </div>
    </section>
  );
}
