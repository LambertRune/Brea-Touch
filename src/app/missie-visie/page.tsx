import type { Metadata } from "next";
import styles from "./page.module.css";

const SDG_TAGS = [
  "SDG 3: Goede gezondheid en welzijn",
  "SDG 4: Kwaliteitsonderwijs",
  "SDG 5: Gendergelijkheid",
  "SDG 8: Eerlijk werk en economische groei",
  "SDG 10: Minder ongelijkheid",
] as const;

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
      <section className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--rose">Missie &amp; Visie</span>
          <h1>Wij geloven in verandering</h1>
          <p className={styles.headerDesc}>
            Borstkanker is één van de meest voorkomende kankers. Vroege detectie
            redt levens. Samen maken we zelfonderzoek tastbaar en toegankelijk.
          </p>
        </div>
      </section>

      <section className="section" id="missie">
        <div className="container">
          <div
            className="text-center"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <span className="badge badge--yellow">Missie</span>
            <h2 style={{ marginTop: "var(--space-md)" }}>Missie</h2>
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
            <span className="badge badge--rose">Visie</span>
            <h2 style={{ marginTop: "var(--space-md)" }}>Visie</h2>
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
              Mensen hebben het vertrouwen om hun lichaam te begrijpen,
              signalen te herkennen en tijdig actie te ondernemen, zodat
              borstkanker vaker in een vroeg stadium wordt ontdekt.
            </p>
            <p style={prose}>
              We besteden extra aandacht aan kwetsbare doelgroepen door
              informatie toegankelijk en begrijpelijk te maken, zodat ook zij
              bereikt en ondersteund worden.
            </p>
            <p style={prose}>
              &ldquo;voelen wat er speelt, begrijpen wat het betekent, vertrouwen
              hebben in jezelf&rdquo;
            </p>
          </div>
        </div>
      </section>

      <section className="section section--alt" id="sdg">
        <div className="container">
          <div
            className="text-center"
            style={{ maxWidth: "720px", margin: "0 auto" }}
          >
            <span className="badge badge--yellow">SDG</span>
            <h2 style={{ marginTop: "var(--space-md)" }}>
              Sustainable Development Goals
            </h2>
            <div className="divider divider--center" />
            <div className={styles.sdgCard}>
              <div className={styles.sdgIcon}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className={styles.sdgTags}>
                {SDG_TAGS.map((label) => (
                  <span key={label} className={styles.sdgTag}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
