import { allPublished } from "@/lib/articles/repository";
import { articleMarkdown, plainHeaders } from "@/lib/articles/plain";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* llms-full.txt — полные тексты статей в Markdown одним файлом. */
export async function GET() {
  const articles = await allPublished(true, 200);
  const head = "# ABBiO — статьи\n\n> Практические разборы о сайтах, SEO, рекламе, обращениях и CRM.\n\n";
  return new Response(head + articles.map(articleMarkdown).join("\n\n"), { headers: plainHeaders("text/plain") });
}
