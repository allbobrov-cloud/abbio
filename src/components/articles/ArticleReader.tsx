import Image from "next/image";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import { articleMarkdownPlugin, safeLink } from "@/lib/articles/markdown";
import { ArticleCta } from "./ArticleCta";
import styles from "./Articles.module.css";
export function ArticleReader({ content, images }: { content: string; images: Record<string, { width: number; height: number }> }) {
  return <div className={styles.prose}><Markdown remarkPlugins={[remarkGfm, remarkDirective, articleMarkdownPlugin]} skipHtml
    urlTransform={url => safeLink(url) ? url : ""}
    components={{
      a: ({ href, children }) => <a href={href} {...(href?.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>,
      p: ({ children, node }) => node?.children.some(child => child.type === "element" && child.tagName === "img") ? <div className={styles.imageParagraph}>{children}</div> : <p>{children}</p>,
      img: ({ src, alt, title }) => {
        if (typeof src !== "string" || !images[src]) return null;
        return <figure><Image src={src} alt={alt ?? ""} width={images[src].width} height={images[src].height} sizes="(max-width:760px) 92vw, 760px" />{title && <figcaption>{title}</figcaption>}</figure>;
      },
      table: ({ children }) => <div className={styles.tableScroll} tabIndex={0} role="region" aria-label="Таблица статьи"><table>{children}</table></div>,
      aside: ({ children, node }) => <aside className={styles.callout} data-tone={node?.properties?.["data-callout"]}>{node?.properties?.["data-title"] && <strong>{String(node.properties["data-title"])}</strong>}{children}</aside>,
      div: ({ children, node }) => node?.properties?.["data-article-cta"] ? <ArticleCta /> : <div>{children}</div>,
    }} >{content}</Markdown></div>;
}
