import { articleApi, authorizeArticles, checkArticleId, readArticleJson, mutateArticles } from "@/lib/articles/api";
import { parseInput, publishSchema } from "@/lib/articles/schema";
import { publishArticle } from "@/lib/articles/repository";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  return articleApi(async () => { authorizeArticles(request); const { id } = await context.params; checkArticleId(id);
    const raw = await readArticleJson(request); const { expectedRevision, publishedAt } = parseInput(publishSchema, raw);
    return mutateArticles(request, raw, client => publishArticle(client, id, expectedRevision, publishedAt)); });
}
