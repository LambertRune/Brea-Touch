import type { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.css";

const SDG_ITEMS = [
  {
    title: "SDG 3",
    description:
      "BréaTouch zet in op bewustwording rond borstkanker en het belang van zelfonderzoek. Door zelfonderzoek te stimuleren, dragen we bij aan vroegdetectie en betere gezondheidsuitkomsten. We verlagen drempels om over gezondheid te praten. ",
    imageSrc: "/pictures/SDG3.png",
    imageAlt: "SDG 3 — goede gezondheid en welzijn",
  },
  {
    title: "SDG 4",
    description:
      "We bieden toegankelijke en begrijpelijke informatie over zelfonderzoek en gezondheid. Via sensibilisering vergroten we kennis bij diverse doelgroepen. Zo versterken we gezondheidsvaardigheden. ",
    imageSrc: "/pictures/SDG4.png",
    imageAlt: "SDG 4 — kwaliteitsonderwijs",
  },
  {
    title: "SDG 5",
    description:
      "We doorbreken taboes rond borstkanker, ook bij mannen. BréaTouch werkt genderinclusief en maakt duidelijk dat iedereen risico loopt. Zo dragen we bij aan gelijke aandacht voor gezondheid. ",
    imageSrc: "/pictures/SDG5.png",
    imageAlt: "SDG 5 — gendergelijkheid",
  },
  {
    title: "SDG 10",
    description:
      "We focussen specifiek op kwetsbare doelgroepen die moeilijk bereikt worden. Door aangepaste communicatie en outreach verkleinen we de drempel. Zo maken we preventie toegankelijk voor iedereen. ",
    imageSrc: "/pictures/SDG10.png",
    imageAlt: "SDG 10 — minder ongelijkheid",
  },
] as const;

type SdgItem = (typeof SDG_ITEMS)[number];

function SdgPairMedia({ item }: { item: SdgItem }) {
  return (
    <div className={styles.sdgPairMedia}>
      <Image
        src={item.imageSrc}
        alt={item.imageAlt}
        fill
        className={styles.sdgPairImg}
        sizes="(max-width: 768px) 96vw, 45vw"
      />
    </div>
  );
}

const prose: React.CSSProperties = {
  fontSize: "1.125rem",
  lineHeight: "1.8",
  color: "var(--color-text-light)",
};

export const metadata: Metadata = {
  title: "Missie & Visie",
  description:
    "Onze missie is om borstkanker vroegtijdig detecteerbaar te maken door bewustwording te vergroten en mensen actief te informeren over het belang van zelfonderzoek.",
};

export default function MissieVisie() {
  return (
    <>
      <div className={styles.aboveFold}>
        <section className={styles.hero} aria-label="Beeld missie en visie">
          <div className={styles.heroImageWrap}>
            <Image
              src="/pictures/IMG_4693.webp"
              alt="BréaTouch — beeld bij missie en visie"
              fill
              className={styles.heroImage}
              sizes="100vw"
              priority
            />
          </div>
        </section>

        <section className={styles.pageHeader}>
          <div className="container">
            <h1>Wij geloven in verandering</h1>
          </div>
        </section>
      </div>

      <section className="section" id="missie">
        <div className="container">
          <div
            className="text-center"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <h2 style={{ marginTop: "var(--space-md)" }}>Onze missie</h2>
            <div className="divider divider--center" />
            <p style={prose}>
              Onze missie is om borstkanker vroegtijdig detecteerbaar te maken
              door bewustwording te vergroten en mensen actief te informeren
              over het belang van zelfonderzoek. We doorbreken het taboe rond
              borstkanker bij mannen en maken het onderwerp bespreekbaar voor
              iedereen. Door toegankelijke en duidelijke educatie willen we
              mensen aanzetten om hun eigen gezondheid beter op te volgen.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--warm" id="visie">
        <div className="container">
          <div
            className="text-center"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <h2 style={{ marginTop: "var(--space-md)" }}>Onze visie</h2>
            <div className="divider divider--center" />
            <p style={prose}>
              Wij streven naar een samenleving waarin bewustwording en preventie
              rond borstkanker centraal staan. Door gerichte educatie en het
              actief stimuleren van zelfonderzoek zetten we mensen aan om
              verantwoordelijkheid te nemen voor hun eigen gezondheid.
            </p>
            <p style={prose}>
              Zelfonderzoek wordt een vaste gewoonte, ook bij jongere
              doelgroepen tussen 20 en 50 jaar die vandaag niet standaard
              bereikt worden door screenings. We doorbreken het taboe rond
              borstkanker bij mannen en zorgen ervoor dat ook zij de juiste
              kennis en ondersteuning krijgen.
            </p>
            <p style={prose}>
              Mensen hebben het vertrouwen om hun lichaam te begrijpen, signalen
              te herkennen en tijdig actie te ondernemen, zodat borstkanker
              vaker in een vroeg stadium wordt ontdekt.
            </p>
            <p style={prose}>
              We besteden extra aandacht aan kwetsbare doelgroepen door
              informatie toegankelijk en begrijpelijk te maken, zodat ook zij
              bereikt en ondersteund worden.
            </p>
            <p style={prose}>
              &ldquo;Voelen wat er speelt, begrijpen wat het betekent,
              vertrouwen hebben in jezelf.&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="sdg">
        <div className="container">
          <div className={`text-center ${styles.sdgSectionInner}`}>
            <h2 style={{ marginTop: "var(--space-md)" }}>
              Sustainable Development Goals
            </h2>
            <div className="divider divider--center" />
            <div className={styles.sdgRows}>
              <div className={styles.sdgRow}>
                {SDG_ITEMS.map((item, index) => {
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
                          <SdgPairMedia item={item} />
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
                          <SdgPairMedia item={item} />
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
