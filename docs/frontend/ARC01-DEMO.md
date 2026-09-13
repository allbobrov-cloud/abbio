# ARC 01 — демо-проект в блоке развития идеи

Дата: 2026-09-13. Маршрут: `/services/design`, секция `flow-title`.

Владелец утвердил визуальное направление по референсу `C:\Users\reddingtonlovitz\.codex\generated_images\01a094ae-5add-7a63-bf7c-fba25e4054b1\exec-c1f4f5ab-11dc-4098-8eeb-0da98c0a3562.png`. Финальное исполнение ещё ожидает просмотра; это не утверждение всей страницы.

Реализация: отдельные `DesignFlow.tsx` и `DesignFlow.module.css`. Пять связанных этапов используют один вымышленный продукт ARC 01. Бриф, артборд, направляющие, типографика, цвета, сетка, desktop/mobile-страницы, цена и носители собраны HTML/CSS. Цена 24 900 ₽ и характеристики условные. Над панелью стоит «ДЕМО-КОНЦЕПТ», под ней сохранено уточнённое объяснение. Демо-кнопки только меняют локальный статус, никаких заказов, оплаты или внешних запросов не создают.

По последней прямой правке владельца пять карточек на широком desktop-виде выровнены по общей верхней и нижней линии; их высоту задаёт самая высокая карточка без жёсткого значения. На tablet остаётся сетка 3 + 2, на mobile — вертикальная последовательность со всеми визуалами и естественной высотой контента. Рендеры показываются с исходной пропорцией 1:1, object-fit: contain. Hover сдвигает карточку на 3px и курсор на artboard; клавиатурный фокус явный. Reduced motion отключает перемещения. Новых зависимостей нет.

## Assets

Сгенерированы встроенным imagegen, затем оптимизированы существующим sharp без crop и растяжения. Исходники сохранены в каталоге generated_images текущей задачи. В проекте:

- `public/services/arc-01-hero-v1.webp` — 768×768, 82 740 байт.
- `public/services/arc-01-angle-v1.webp` — 768×768, 67 004 байта.

Оба кадра являются только изображениями продукта: интерфейсы и читаемые тексты не запечены в растр. Второй кадр получен с первым как reference для сохранения конструкции и отделки.

## Точные промпты

### Основной ракурс

```text
Use case: product-mockup. Generate ONE isolated product render for a fictional premium portable speaker internally called ARC 01. No text or name printed on it. Object: compact rounded cylindrical graphite speaker, fine black woven acoustic mesh on sides, matte dark graphite circular top with three understated recessed round control buttons, slim black fabric wrist loop attached high on the right, tiny single cobalt blue indicator low on the front. Sophisticated believable industrial design, same object will be reused through a design process demo. Entire speaker visible, upright, front three-quarter view with top visible, centered occupying 76% of square canvas. Very pale cool white background #f4f5f7, subtle contact shadow only, crisp soft studio photography, high material fidelity. No logos, brand, words, numbers, UI, panels, cards, typography, watermark, hands, desk, props. Deliver square 1024x1024 image. This is only a standalone product photo asset, never a whole website or interface.
```

### Дополнительный ракурс

```text
Use case: product-mockup, identity-preserve. Reference image is the exact fictional ARC 01 speaker product to preserve. Generate a second standalone product photograph of EXACTLY this same speaker: same proportions, graphite woven mesh, same matte top three circular buttons, wrist loop on same side, blue LED and rounded base. Show it lying diagonally on its side, three-quarter angle with top controls visible toward upper right, full product and wrist loop inside square frame with 12% whitespace around it. Seamless pale cool white #f4f5f7 backdrop, subtle soft contact shadow, crisp premium studio light. No text, no labels, no logos, no UI or card or panels, no real brand, no props. This is a separate matching alternate-angle product asset for CSS-built artboards. Do not draw any website.
```

## Проверки

`npm run lint` и production `npm run build`. Browser QA в Chrome: 1440×900, 1280×720, 1024×768, 390×844, 360×800, 320×700. На всех размерах проверены root/local overflow, границы контента, пять этапов, маркировка, загрузка изображений и пропорции, демо-кнопки, клавиатурный focus, reduced motion и console errors/warnings. Подробные результаты: `output/playwright/arc-qa.json`, скриншоты: `output/playwright/arc-panel-*.png`. В снимках самой панели sticky-header скрыт только на время захвата, чтобы не закрывать содержимое.

Сравнение с сохранёнными перед работой исходниками подтвердило сохранность всей разметки за пределами DesignFlow и его подписи; в CSS страницы добавлены только scoped-правила целевой секции. Общая оболочка, hero и остальные страницы не редактировались. Публикация не выполнялась. Safari/Firefox и полный аудит вспомогательных технологий не проводились.
