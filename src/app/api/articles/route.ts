import { articleApi, authorizeArticles, readArticleJson, mutateArticles } from "@/lib/articles/api";
import { parseInput, createSchema } from "@/lib/articles/schema";
import { createArticle } from "@/lib/articles/repository";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  return articleApi(async () => {
    authorizeArticles(request);
    const raw = await readArticleJson(request);
    const { slug, status: _status, ...input } = parseInput(createSchema, raw); void _status;
    return mutateArticles(request, raw, client => createArticle(client, slug, input), 201);
  });
}
