"use client";

import { useEffect, useState } from "react";
import styles from "./PhotoLightbox.module.css";

export function PhotoLightbox({
  src,
  fullSrc,
  alt = "",
  triggerClassName,
  imageClassName,
}: {
  src: string;
  fullSrc?: string;
  alt?: string;
  triggerClassName?: string;
  imageClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const enlarged = fullSrc || src;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className={`${styles.photoLightboxTrigger}${triggerClassName ? ` ${triggerClassName}` : ""}`}
        onClick={() => setOpen(true)}
        aria-label="Vergroot afbeelding"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={imageClassName} />
      </button>

      {open && (
        <div
          className={styles.overlay}
          role="dialog"
          aria-modal="true"
          aria-label={alt || "Vergrote afbeelding"}
          onClick={() => setOpen(false)}
        >
          <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={enlarged} alt={alt} className={styles.fullImage} />
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </>
  );
}
