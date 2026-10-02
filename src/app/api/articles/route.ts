import { articleApi, apiJson, authorizeArticles, readArticleJson, mutateArticles } from "@/lib/articles/api";
import { ArticleError, parseInput, createSchema, slugSchema } from "@/lib/articles/schema";
import { createArticle, getWorkingBySlug } from "@/lib/articles/repository";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return articleApi(async () => {
    authorizeArticles(request);
    const slug = parseInput(slugSchema, new URL(request.url).searchParams.get("slug"));
    const article = await getWorkingBySlug(slug);
    if (!article) throw new ArticleError("article_not_found", 404);
    return apiJson(article);
  });
}
export async function POST(request: Request) {
  return articleApi(async () => {
    authorizeArticles(request);
    const raw = await readArticleJson(request);
    const { slug, status: _status, ...input } = parseInput(createSchema, raw); void _status;
    return mutateArticles(request, raw, client => createArticle(client, slug, input), 201);
  });
}
