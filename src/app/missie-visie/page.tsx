import type { Metadata } from "next";
import Image from "next/image";
import { getServerMessages } from "@/lib/i18n/server";
import styles from "./page.module.css";

const SDG_IMAGE_SRCS = [
  "/pictures/SDG3.webp",
  "/pictures/SDG4.webp",
  "/pictures/SDG5.webp",
  "/pictures/SDG10.webp",
] as const;

const prose: React.CSSProperties = {
  fontSize: "1.125rem",
  lineHeight: "1.8",
  color: "var(--color-text-light)",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getServerMessages();
  return {
    title: t.mission.metaTitle,
    description: t.mission.metaDescription,
  };
}

export default async function MissieVisie() {
  const t = await getServerMessages();
  const sdgItems = t.mission.sdgItems.map((item, index) => ({
    ...item,
    imageSrc: SDG_IMAGE_SRCS[index],
  }));

  return (
    <>
      <div className={styles.aboveFold}>
        <section className={styles.hero} aria-label={t.mission.heroAria}>
          <div className={styles.heroImageWrap}>
            <Image
              src="/pictures/IMG_4693.webp"
              alt={t.mission.heroImageAlt}
              fill
              className={styles.heroImage}
              sizes="100vw"
              priority
            />
          </div>
        </section>

        <section className={styles.pageHeader}>
          <div className="container">
            <h1>{t.mission.pageTitle}</h1>
          </div>
        </section>
      </div>

      <section className="section" id="missie">
        <div className="container">
          <div
            className="text-center"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <h2 style={{ marginTop: "var(--space-md)" }}>
              {t.mission.missionTitle}
            </h2>
            <div className="divider divider--center" />
            <p style={prose}>{t.mission.missionText}</p>
          </div>
        </div>
      </section>

      <section className="section section--warm" id="visie">
        <div className="container">
          <div
            className="text-center"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <h2 style={{ marginTop: "var(--space-md)" }}>
              {t.mission.visionTitle}
            </h2>
            <div className="divider divider--center" />
            <p style={prose}>{t.mission.visionP1}</p>
            <p style={prose}>{t.mission.visionP2}</p>
            <p style={prose}>{t.mission.visionP3}</p>
            <p style={prose}>{t.mission.visionP4}</p>
            <p style={prose}>&ldquo;{t.mission.visionQuote}&rdquo;</p>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="sdg">
        <div className="container">
          <div className={`text-center ${styles.sdgSectionInner}`}>
            <h2 style={{ marginTop: "var(--space-md)" }}>
              {t.mission.sdgTitle}
            </h2>
            <div className="divider divider--center" />
            <div className={styles.sdgRows}>
              <div className={styles.sdgRow}>
                {sdgItems.map((item, index) => {
                  const headingId = `sdg-card-heading-${index}`;
                  return (
                    <article
                      key={item.title}
                      className={`${styles.sdgPairBlock} ${
                        index % 2 === 0
                          ? styles.sdgPairBlockImageTop
                          : styles.sdgPairBlockTextTop
                      }`}
                      aria-labelledby={headingId}
                    >
                      {index % 2 === 0 ? (
                        <>
                          <div className={styles.sdgPairMedia}>
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              fill
                              className={styles.sdgPairImg}
                              sizes="(max-width: 768px) 96vw, 45vw"
                            />
                          </div>
                          <h3 className={styles.sdgPairTitle} id={headingId}>
                            {item.title}
                          </h3>
                          <p className={styles.sdgPairDesc}>
                            {item.description}
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className={styles.sdgPairTitle} id={headingId}>
                            {item.title}
                          </h3>
                          <p className={styles.sdgPairDesc}>
                            {item.description}
                          </p>
                          <div className={styles.sdgPairMedia}>
                            <Image
                              src={item.imageSrc}
                              alt={item.imageAlt}
                              fill
                              className={styles.sdgPairImg}
                              sizes="(max-width: 768px) 96vw, 45vw"
                            />
                          </div>
                        </>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
