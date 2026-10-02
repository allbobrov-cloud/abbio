# Серверное SEO статей ABBiO

Все значения формируются при SSR из опубликованной редакции. Это действует и для уже созданных статей, без изменения Make/Airtable и без повторной генерации текста.

- `title`: заданный seoTitle или заголовок, один суффикс `| ABBiO`. Заголовок сохраняется целиком, чтобы не потерять смысл и различия статей.
- Description: seoDescription или вводный абзац; очистка текста и сокращение до 160 символов по предложениям/словам. Это редакционный бюджет, не лимит поисковика.
- Canonical: абсолютный URL статьи; index/follow и разрешение большого превью изображений. Черновики и отсутствующие страницы дают 404/noindex.
- Open Graph и Twitter: статья, полное название, краткое описание, абсолютный URL WebP, реальные размеры изображения, alt, даты и категория. Если alt похож на техническое имя файла, используется заголовок статьи.
- BlogPosting: canonical/@id, headline, краткое описание, существующая обложка, ru-RU, русское название рубрики, фактические даты публикации/публичной редакции, настоящий автор из данных. Профили авторов и факты не придумываются.
- Входящий HTML H1 преобразуется в H2: главный H1 страницы — заголовок статьи. Для рубрик Сайты, SEO, Маркетинг предусмотрены ссылки на соответствующую услугу, если редактор не задал связи.
- Sitemap автоматически включает только опубликованные страницы; IndexNow автоматически уведомляет о публикации, обновлении и снятии. См. [IndexNow](../seo/INDEXNOW.md).

Для административного поиска записи доступен авторизованный `GET /api/articles?slug=<slug>` с тем же Bearer-токеном. Он возвращает рабочую редакцию и UUID; публичного списка черновиков нет. Затем можно вызвать существующий `/api/articles/<UUID>/unpublish` с expectedRevision и Idempotency-Key. Это удаляет публичную страницу, сохраняя редакцию в БД.

Проверено 02.10.2026 на отдельной локальной БД: 85 проверок lifecycle/API и 46 multipart Make; `scripts/articles-seo-indexnow-test.mts` проверяет HTML Googlebot, metadata/JSON-LD, один H1, поиск по slug, отсутствие событий для draft/replay, очередь и реальный SQL повторов при HTTP 429/сетевой ошибке/202. Транспорт IndexNow в тесте подменён: тестовые URL не отправляются поисковикам. Запуск: `npx tsx --conditions=react-server scripts/articles-seo-indexnow-test.mts` с локальными DATABASE_URL, ARTICLES_API_TOKEN и SITE_TEST_URL.

Источники: [Google: title](https://developers.google.com/search/docs/appearance/title-link), [сниппеты](https://developers.google.com/search/docs/appearance/snippet), [Article](https://developers.google.com/search/docs/appearance/structured-data/article), [протокол IndexNow](https://www.indexnow.org/documentation). Приём уведомления не гарантирует обход или включение страницы в поиск.
