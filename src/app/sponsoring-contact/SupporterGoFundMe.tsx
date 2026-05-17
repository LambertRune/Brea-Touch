"use client";

import QRCode from "react-qr-code";

import styles from "./page.module.css";

/** Zelfde campagne als op doe-mee / GoFundMe-inzamelingsactie Bréa Touch */
export const GOFUNDME_URL = "https://gofund.me/94dae2071";

/** QR uit GoFundMe-URL (zelfde aanpak als https://www.shadcn.io/tools/qr-generator). */
export default function SupporterGoFundMe() {
  return (
    <div className={styles.supporterDonate}>
      <a
        href={GOFUNDME_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn btn--primary ${styles.gofundLink}`}
      >
        Steun via GoFundMe
      </a>

      <div className={styles.orDivider}>
        <span className={styles.orLine} aria-hidden />
        <span className={styles.orText}>of</span>
        <span className={styles.orLine} aria-hidden />
      </div>

      <div className={styles.qrBlock}>
        <QRCode
          value={GOFUNDME_URL}
          size={92}
          level="M"
          fgColor="#494949"
          bgColor="#ffffff"
          aria-label="QR-code naar GoFundMe-inzamelingsactie BréaTouch"
        />
      </div>
    </div>
  );
}
