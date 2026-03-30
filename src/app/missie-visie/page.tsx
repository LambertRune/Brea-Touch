import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Missie & Visie",
  description:
    "Ontdek de missie en visie van BréaTouch: taboes doorbreken, bewustwording verhogen en zelfonderzoek tastbaar en toegankelijk maken voor iedereen.",
};

export default function MissieVisie() {
  return (
    <>
      {/* Page Header */}
      <section className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--rose">Missie & Visie</span>
          <h1>Wij geloven in verandering</h1>
          <p className={styles.headerDesc}>
            Borstkanker is één van de meest voorkomende kankers. Vroege detectie
            redt levens. Samen maken we zelfonderzoek tastbaar en toegankelijk.
          </p>
        </div>
      </section>

      {/* Maatschappelijke Uitdaging */}
      <section className="section" id="uitdaging">
        <div className="container">
          <div className={styles.splitSection}>
            <div className={styles.splitContent}>
              <span className="badge badge--yellow">SDG</span>
              <h2>Maatschappelijke uitdaging</h2>
              <div className="divider" />
              <p>
                De maatschappelijke uitdaging is dat borstkanker nog te vaak te
                laat wordt ontdekt, terwijl het één van de meest voorkomende
                kankers is en vroege detectie de overlevingskansen sterk
                vergroot.
              </p>
              <p>
                Vooral bij jongere volwassenen en bij mannen worden signalen vaak
                niet of te laat herkend, door taboe, misinformatie en het idee
                dat borstkanker &quot;geen mannenzaak&quot; is.
              </p>
              <p>
                Tegelijk weten veel mensen niet goed hoe ze zelf hun borsten
                moeten controleren of welke signalen alarmsignalen zijn, terwijl
                een groot deel van de tumoren eerst door mensen zelf opgemerkt
                wordt.
              </p>
            </div>
            <div className={styles.splitVisual}>
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
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
                <h3>Sustainable Development Goals</h3>
                <div className={styles.sdgTags}>
                  <span className={styles.sdgTag}>SDG 3: Gezondheid</span>
                  <span className={styles.sdgTag}>SDG 4: Educatie</span>
                  <span className={styles.sdgTag}>SDG 10: Ongelijkheid</span>
                </div>
                <p>
                  Onze missie speelt in op taboes doorbreken, bewustwording
                  verhogen en zelfonderzoek tastbaar, eenvoudig en toegankelijk
                  maken voor iedereen. Dit is in lijn met de SDG&apos;s rond
                  gezondheid, ongelijkheid verminderen en educatie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missie */}
      <section className="section section--warm" id="missie">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="badge badge--rose">Onze Missie</span>
            <h2 style={{ marginTop: "var(--space-md)" }}>
              Taboes doorbreken, bewustwording verhogen
            </h2>
            <div className="divider divider--center" />
            <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color-text-light)" }}>
              Onze missie is om taboes rond borstkanker te doorbreken,
              bewustwording te verhogen en zelfonderzoek tastbaar, eenvoudig en
              toegankelijk te maken voor iedereen – ongeacht geslacht of
              leeftijd.
            </p>
            <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color-text-light)" }}>
              Wij geloven dat bewustwording pas echt werkt als je het kan voelen,
              begrijpen en herkennen. Daarom werken wij aan een tastbare tool die
              mensen helpt om zelfonderzoek beter te begrijpen en met meer
              vertrouwen uit te voeren.
            </p>
          </div>
        </div>
      </section>

      {/* Probleemstelling */}
      <section className="section" id="probleem">
        <div className="container">
          <div className="text-center">
            <span className="badge badge--sage">Probleemstelling</span>
            <h2 style={{ marginTop: "var(--space-md)" }}>
              Waarom dit nodig is
            </h2>
            <div className="divider divider--center" />
          </div>
          <div className={styles.problemGrid}>
            <div className={`card ${styles.problemCard}`}>
              <div className={styles.problemIcon}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <h4>Te laat ontdekt</h4>
              <p>
                Borstkanker is één van de meest voorkomende kankers. Vroege
                detectie redt levens, maar veel gevallen worden te laat
                vastgesteld.
              </p>
            </div>
            <div className={`card ${styles.problemCard}`}>
              <div className={styles.problemIcon}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="23" y1="11" x2="17" y2="11" />
                </svg>
              </div>
              <h4>Geen zelfcontrole</h4>
              <p>
                Veel mensen controleren hun borsten niet regelmatig.
                Zelfcontrole wordt vaak vergeten of men weet niet hoe.
              </p>
            </div>
            <div className={`card ${styles.problemCard}`}>
              <div className={styles.problemIcon}>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
              </div>
              <h4>Taboe bij mannen</h4>
              <p>
                Het komt ook voor bij mannen maar daar is nog een taboe
                rond. Bewustwording begint bij kennis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wij zijn we */}
      <section className="section section--alt" id="wie-zijn-we">
        <div className="container">
          <div className="text-center" style={{ maxWidth: "800px", margin: "0 auto" }}>
            <span className="badge badge--rose">Wie zijn wij</span>
            <h2 style={{ marginTop: "var(--space-md)" }}>
              Het team achter BréaTouch
            </h2>
            <div className="divider divider--center" />
            <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color-text-light)" }}>
              Wij zijn een team van gedreven jonge ondernemers die geloven dat
              bewustwording over borstkanker toegankelijk moet zijn voor
              iedereen. Met onze achtergrond in sociaal-agogisch werk werken we samen aan een product dat impact maakt.
            </p>
            <p style={{ fontSize: "1.125rem", lineHeight: "1.8", color: "var(--color-text-light)" }}>
              BréaTouch wil drempels verlagen, kennis toegankelijk maken en
              mensen sterker maken in de zorg voor hun eigen lichaam – ongeacht
              of je man of vrouw bent.
            </p>
          </div>
        </div>
      </section>

      {/* Businessmodel */}
      <section className="section" id="businessmodel">
        <div className="container">
          <div className={styles.splitSection}>
            <div className={styles.splitContent}>
              <span className="badge badge--yellow">Businessmodel</span>
              <h2>Hier zit onze echte kracht</h2>
              <div className="divider" />
              <p>
                Ons businessmodel is gericht op maximale, doelgerichte
                zichtbaarheid bij de eindgebruiker. In plaats van rechtstreeks
                aan consumenten te verkopen, werken wij samen met merken en
                partners die onze douchespons integreren in hun eigen aanbod.
              </p>
              <p>
                Op die manier komt BréaTouch letterlijk in handen van de
                gebruiker tijdens een relevant zorgmoment. Deze directe en
                tastbare ervaring zorgt ervoor dat zowel ons product als de
                boodschap van onze partners op een natuurlijke en impactvolle
                manier worden overgebracht.
              </p>
            </div>
            <div className={styles.splitVisual}>
              <div className={styles.marketGrid}>
                {[
                  "Apotheken",
                  "Openbare plaatsen",
                  "Wellness & beauty",
                  "Lingeriewinkels",
                  "Online",
                  "Kankerorganisaties",
                ].map((market) => (
                  <div key={market} className={styles.marketTag}>
                    {market}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
