"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLocale } from "@/components/LocaleProvider";
import styles from "@/app/page.module.css";

gsap.registerPlugin(useGSAP);

export function HeroAnimatedTitles() {
  const { t } = useLocale();
  const root = useRef<HTMLHeadingElement>(null);
  const ariaLabel = t.hero.lines.join(" ");

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.to("[data-hero-char]", {
        opacity: 1,
        y: 0,
        duration: 0.52,
        ease: "power3.out",
        stagger: 0.014,
        delay: 0.06,
      });
    },
    { scope: root },
  );

  return (
    <h1 className={styles.heroTitle} ref={root} aria-label={ariaLabel}>
      {t.hero.lines.map((line, lineIndex) => (
        <span className={styles.heroTitleLine} key={lineIndex}>
          {Array.from(line).map((char, charIndex) => (
            <span
              key={`${lineIndex}-${charIndex}`}
              className={styles.heroChar}
              data-hero-char
              aria-hidden
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
