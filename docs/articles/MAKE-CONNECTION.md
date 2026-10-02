# Подключение к Make из следующих чатов

**Актуальная согласованная работа 02.10.2026:** после отката владелец одобрил настройку **только модуля 19** и совместимый обработчик сайта. Выполнено; настройки и границы — [MAKE-MODULE19.md](MAKE-MODULE19.md). Остальные модули и настройки сценария сохранены. Широкая переделка версии 6 остаётся отменённой. Следующий шаг владельца — серверная переменная; deploy/включение отдельно.

**Последнее поручение владельца 02.10.2026: вернуть исходный работающий сценарий. Выполнено.** Исходные восемь модулей восстановлены из копии до правок; параметры и mapper каждого модуля проверены на совпадение. Исправление версии 6 отменено. Не повторять его. Airtable — только список тем; его схему не менять. Последующие описания исправления относятся к истории.

Владелец 02.10.2026 предоставил API-токен и явно поручил сохранить его локально для других чатов. Проверено подключение к EU1 и чтение сценария по API.

Секретный файл: `C:\Users\reddingtonlovitz\.codex\credentials\make-abbio.json`. Он находится вне проекта и Git. Поля: `apiToken`, `baseUrl`, `teamId`, `scenarioId`, `scenarioName`, `scenarioUrl`. Не выводить содержимое целиком в ответы или журналы, не копировать токен в документацию, Obsidian или frontend.

Сценарий: «Abbio Статьи для сайта», ID `7733780`, team ID `1470204`. Базовый API: `https://eu1.make.com/api/v2`. Авторизация Make: `Authorization: Token <apiToken>`; авторизация сайта ABBiO отдельно использует `Bearer <ARTICLES_API_TOKEN>`. Эти токены не взаимозаменяемы.

Пример чтения без вывода ключа:

```powershell
$makeCfg = Get-Content -LiteralPath 'C:\Users\reddingtonlovitz\.codex\credentials\make-abbio.json' -Raw | ConvertFrom-Json
$makeHeaders = @{ Authorization = 'Token ' + $makeCfg.apiToken }
$scenario = Invoke-RestMethod -Uri ($makeCfg.baseUrl + '/scenarios/' + $makeCfg.scenarioId) -Headers $makeHeaders
$blueprint = Invoke-RestMethod -Uri ($makeCfg.baseUrl + '/scenarios/' + $makeCfg.scenarioId + '/blueprint') -Headers $makeHeaders
```

Форма полученного blueprint: `$blueprint.response.blueprint.flow`. В snapshot могут находиться секреты других HTTP-модулей; перед выводом нужно скрывать Authorization и HASH_KEY. Приватные снимки анализа: `C:\Users\reddingtonlovitz\.codex\credentials\make-abbio-analysis\`. Они также вне проекта/Git.

Список: `GET /scenarios?teamId=1470204`; детали: `GET /scenarios/7733780`; схема: `GET /scenarios/7733780/blueprint`; журнал: `GET /scenarios/7733780/logs`. Пагинация через `pg[limit]` и `pg[offset]`.

После анализа владелец прямо поручил исправить сценарий, особенно модуль 19. Исправление сохранено, версия 6; описание: [MAKE-SCENARIO-FIX.md](MAKE-SCENARIO-FIX.md). Airtable — исключительно список тем, обработанная запись удаляется после успешной публикации. Сценарий выключен до готовности production API. Наличие этого документа не разрешает включение, публикацию сайта или изменение Airtable.

Разбор: [MAKE-SCENARIO-AUDIT.md](MAKE-SCENARIO-AUDIT.md). Контракт сайта: [MAKE-API.md](MAKE-API.md).
