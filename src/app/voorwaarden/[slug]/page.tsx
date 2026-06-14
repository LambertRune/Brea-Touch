import { notFound } from "next/navigation";
import { RichTextViewer } from "@/components/RichTextViewer";
import { getLegalPageBySlug } from "@/lib/cms";
import { getServerMessages } from "@/lib/i18n/server";
import styles from "./page.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, t] = await Promise.all([params, getServerMessages()]);
  const page = await getLegalPageBySlug(slug);
  if (!page) return { title: t.legal.pageNotFound };
  return { title: page.title };
}

export default async function VoorwaardenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getLegalPageBySlug(slug);
  if (!page) notFound();

  return (
    <article className={`section ${styles.page}`}>
      <div className={`container ${styles.inner}`}>
        <h1>{page.title}</h1>
        <div className="divider" />
        <RichTextViewer html={page.content} />
      </div>
    </article>
  );
}
