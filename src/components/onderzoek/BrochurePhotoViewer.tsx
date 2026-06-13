"use client";

import { getImageUrl } from "@/lib/directus-url";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import styles from "./BrochurePhotoViewer.module.css";

export function BrochurePhotoViewer({
  fileId,
  alt = "Brochure",
}: {
  fileId: string;
  alt?: string;
}) {
  const src = getImageUrl(fileId, "width=1400&quality=85");
  const fullSrc = getImageUrl(fileId, "quality=90");
  if (!src || !fullSrc) return null;

  return (
    <div className={styles.wrap}>
      <PhotoLightbox
        src={src}
        fullSrc={fullSrc}
        alt={alt}
        imageClassName={styles.image}
      />
    </div>
  );
}
