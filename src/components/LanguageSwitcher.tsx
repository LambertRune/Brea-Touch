"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { LOCALE_LABELS, LOCALES } from "@/lib/i18n/types";
import styles from "./LanguageSwitcher.module.css";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {LOCALE_LABELS[locale]}
        <span className={styles.chevron} aria-hidden>
          ▾
        </span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox" aria-label={t.common.language}>
          {LOCALES.map((code) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                type="button"
                className={`${styles.option}${locale === code ? ` ${styles.optionActive}` : ""}`}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
              >
                {LOCALE_LABELS[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
