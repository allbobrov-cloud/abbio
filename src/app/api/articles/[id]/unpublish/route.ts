import { articleApi, authorizeArticles, checkArticleId, readArticleJson, mutateArticles } from "@/lib/articles/api";
import { parseInput, unpublishSchema } from "@/lib/articles/schema";
import { unpublishArticle } from "@/lib/articles/repository";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  return articleApi(async () => { authorizeArticles(request); const { id } = await context.params; checkArticleId(id);
    const raw = await readArticleJson(request); const { expectedRevision } = parseInput(unpublishSchema, raw);
    return mutateArticles(request, raw, client => unpublishArticle(client, id, expectedRevision)); });
}
