import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Ontmoet het team achter BréaTouch: gedreven ondernemers die bewustwording over borstkanker toegankelijk willen maken voor iedereen.",
};

export default function TeamPage() {
  return (
    <section className={styles.pageHeader} id="wie-zijn-we">
      <div className="container">
        <span className="badge badge--rose">Wie zijn wij</span>
        <h1>Het team achter BréaTouch</h1>
        <p className={styles.headerDesc}>
          Wij zijn een team van gedreven jonge ondernemers die geloven dat
          bewustwording over borstkanker toegankelijk moet zijn voor iedereen.
          Met onze achtergrond in sociaal-agogisch werk werken we samen aan een
          product dat impact maakt.
        </p>
        <p className={styles.headerDesc}>
          BréaTouch wil drempels verlagen, kennis toegankelijk maken en mensen
          sterker maken in de zorg voor hun eigen lichaam – ongeacht of je man
          of vrouw bent.
        </p>
      </div>
    </section>
  );
}
