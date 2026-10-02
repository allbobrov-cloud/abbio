import { articleApi, authorizeArticles, checkArticleId, readArticleJson, mutateArticles, apiJson } from "@/lib/articles/api";
import { parseInput, updateSchema, ArticleError } from "@/lib/articles/schema";
import { getWorking, updateArticle } from "@/lib/articles/repository";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, context: Context) {
  return articleApi(async () => { authorizeArticles(request); const { id } = await context.params; checkArticleId(id);
    const value = await getWorking(id); if (!value) throw new ArticleError("article_not_found", 404); return apiJson(value); });
}
export async function PATCH(request: Request, context: Context) {
  return articleApi(async () => { authorizeArticles(request); const { id } = await context.params; checkArticleId(id);
    const raw = await readArticleJson(request); const { expectedRevision, ...input } = parseInput(updateSchema, raw);
    // Zod defaults are useful for CREATE, but PATCH must preserve omitted fields.
    const patch = Object.fromEntries(Object.entries(input).filter(([key]) => Object.hasOwn(raw as object, key)));
    return mutateArticles(request, raw, client => updateArticle(client, id, expectedRevision, patch)); });
}
