import { sanitizeHtml } from "@/lib/sanitize";
import styles from "./RichTextViewer.module.css";

export function RichTextViewer({
  html,
  className,
}: {
  html: string | null | undefined;
  className?: string;
}) {
  const safe = sanitizeHtml(html || "");
  if (!safe) return null;

  return (
    <div
      className={[styles.viewer, className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
