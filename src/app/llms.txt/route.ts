import { allPublished } from "@/lib/articles/repository";
import { articleSeo } from "@/lib/articles/seo";
import { plainHeaders } from "@/lib/articles/plain";
import { services } from "@/lib/content";
import { operator } from "@/lib/legal";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* llms.txt — краткая карта сайта для ИИ-ассистентов (формат llmstxt.org). */
export async function GET() {
  const articles = await allPublished();
  const lines = [
    "# ABBiO",
    "",
    "> Агентство ABBiO: дизайн, сайты и маркетинг для бизнеса — SEO, Яндекс Директ, CRM и аналитика. Статьи — практические разборы для владельцев и руководителей бизнеса.",
    "",
    `Контакт: ${operator.email}. Полные тексты статей: ${absoluteUrl("/llms-full.txt")}`,
    "",
    "## Услуги",
    ...services.map((service) => `- [${service.title}](${absoluteUrl(`/services/${service.slug}`)}): ${service.description}`),
    "",
    "## Статьи",
    ...articles.map((article) => `- [${article.title}](${absoluteUrl(`/articles/${article.slug}.md`)}): ${articleSeo(article).description}`),
    "",
    "## Дополнительно",
    `- [Кейсы](${absoluteUrl("/cases")}): проекты агентства`,
    `- [Как работаем](${absoluteUrl("/process")}): этапы работы`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: plainHeaders("text/plain") });
}
