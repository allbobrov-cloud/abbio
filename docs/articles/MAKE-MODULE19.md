# ABBiO: согласованная настройка только модуля 19

02.10.2026 владелец согласовал сохранить работающую цепочку Make, перенастроить **только HTTP 19** под ABBiO и подготовить на сайте совместимый обработчик. Переменную сервера владелец добавляет самостоятельно. Airtable — только список тем, без изменения таблицы.

В Make сценарий `7733780` сохранён как blueprint версия **9**. Все остальные семь модулей и metadata сценария полностью совпадают с приватной копией до этой правки. Сценарий остаётся выключенным; расписание 15 минут не менялось. Новых модулей, JSON-структур, prompts или фильтров нет. Модуль 21 по-прежнему удаляет выбранную тему после успешного HTTP 19.

## HTTP 19

| Поле | Значение |
|---|---|
| Authentication type | No authentication; авторизация задана HTTP-заголовком |
| URL | `https://abbio.ru/api/blog/articles` |
| Method | POST |
| Body content type | multipart/form-data |
| Header Authorization | `Bearer <ARTICLES_API_TOKEN>` |
| Header Idempotency-Key | `abbio:{{1.id}}:import:v1` |
| Parse response | Yes |
| Stop on HTTP error | Yes |
| Timeout | 120 секунд |

| Multipart field | Mapping |
|---|---|
| NAME | `{{9.result}}` |
| DETAIL_TEXT | `{{22.choices[].message.content}}` |
| PREVIEW_PICTURE | `data:{{ifempty(get(16.data; "data.1.media_type"); "image/png")}};base64,{{get(16.data; "data.1.b64_json")}}` |
| DETAIL_PICTURE | пустое значение; обложка берётся из PREVIEW_PICTURE |
| IMAGE_ALT | `{{11.result}}` |
| SOURCE_ID | `{{1.id}}` |
| TOPIC | ``{{1.`Abbio Темы для статей`}}`` |

Mappings NAME, DETAIL_TEXT и IMAGE_ALT сохранены. По замечанию владельца исправлена обложка внутри HTTP 19: явный выбор первого элемента data через get, MIME по умолчанию image/png, удалена несовместимая ссылка через choices. Один base64 не дублируется в двух полях, чтобы не удваивать размер запроса. HASH_KEY чужого сайта удалён. SOURCE_ID и TOPIC передаются непосредственно из результата прежнего поиска Airtable; в таблицу ничего не пишется. Формат ответа подтверждён [документацией OpenRouter](https://openrouter.ai/docs/guides/overview/multimodal/image-generation), индекс первого элемента и вложенные пути — [документацией Make](https://help.make.com/general-functions).

## Совместимый обработчик сайта

`src/app/api/blog/articles/route.ts` использует тот же `ARTICLES_API_TOKEN`, что основной редакционный API. Авторизация выполняется до чтения тела. Multipart ограничен 8 MiB, изображение — 5 MiB/16 MP; base64 или файл, PNG/JPEG/WebP/AVIF. Если media_type поставщика пустой, `data:;base64,...` допустим: фактическое изображение проверяет sharp. Внешние URL изображений не скачиваются; PREVIEW_PICTURE с base64 имеет приоритет над DETAIL_PICTURE.

HTML-фрагмент статьи переводится в Markdown через rehype/remark. Сохраняются абзацы, таблицы, списки и H2/H3; H4 становится H3. Скрипты, обработчики событий, style, неподдержанные HTML-элементы и опасные ссылки отклоняются. Заголовок и alt берутся из прежних генераторов. Description/excerpt — первый абзац, категория — суффикс темы, fallback «Практика». Slug — транслитерация заголовка + ID строки. Неподтверждённые кейсы, результаты и ссылки не добавляются.

Изображение WebP, draft, опубликованная редакция и результат идемпотентности записываются в **одной транзакции** существующей схемы `abbio_editorial`. Успех — `201` с `id`, `slug`, `status: published`, `revision`, `publishedRevision`, `url`, `coverImage`. Если публикация не прошла, новые статья и обложка не сохраняются. Повтор того же запроса и ключа возвращает тот же результат; другой материал с тем же ключом даёт `409`. При ошибке HTTP 19 останавливается, и прежний модуль удаления не выполняется.

После сетевого таймаута повторять HTTP с теми же данными и ключом. Полный новый запуск генераторов для той же оставшейся темы может изменить текст/картинку и дать `409 idempotency_conflict`; исходную цепочку восстановления вне модуля 19 по поручению владельца не меняли.

## Переменная и запуск

Значение для сервера: приватный файл `C:\Users\reddingtonlovitz\.codex\credentials\abbio-articles-server.env`. В нём одна строка `ARTICLES_API_TOKEN=...`; значение совпадает с Authorization HTTP 19 и локальным `.env.local`. Не помещать файл или значение в Git/документы/frontend. Make API token для управления сценариями — другой ключ.

На сервере также требуется существующий `DATABASE_URL`, миграция `npm run articles:migrate` и **публикация новой версии сайта с обработчиком**. Добавление одной переменной не создаёт API на домене. Commit/push/deploy не выполнялись. Боевой домен пока отдаёт HTML 404 вместо этого endpoint; сценарий не запускался и не включался.

## Проверки

- TypeScript, ESLint новых исходников и production build — успешно.
- `scripts/articles-make-test.mjs` — **46 проверок** на отдельной локальной PostgreSQL: авторизация, поля, unsafe HTML/URL, base64 и повреждённое изображение, H4/таблицы, публикация и WebP, повтор/конфликт ключа, конкурентный повтор, откат изображения/статьи при конфликте SEO-title, публичный URL и sitemap.
- Make API подтвердил `isinvalid: false`, `isActive: false`; сравнение всех семи остальных модулей и metadata подтвердило отсутствие изменений.
- Реальный проход Make → production → удаление темы ещё не выполнялся: он возможен после переменной, миграции и отдельно разрешённого deploy.

Приватные snapshots: `before-module19-only.private.json` и `after-module19-only.private.json` в папке `C:\Users\reddingtonlovitz\.codex\credentials\make-abbio-analysis\`. Не выводить их целиком: HTTP-headers содержат секреты. Ранее предложенная широкая переделка остаётся отменённой.
