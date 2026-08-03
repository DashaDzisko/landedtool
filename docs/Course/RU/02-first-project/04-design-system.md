

## Почему дизайн-система идёт первой

Ты дизайнер. Ты знаешь, что цвета, шрифты и отступы должны быть согласованными. Но ИИ не знает твоих предпочтений. Если ты строишь без дизайн-системы, ИИ выбирает случайный синий на одном экране и случайный серый на следующем.

Поэтому Landed определяет свою дизайн-систему **до** того, как строит страницы, и держит её в одном месте. Тогда ИИ следует ей везде.

## Где живут токены

В Tailwind CSS v4 **нет `tailwind.config.ts`**. Дизайн-токены — это CSS-переменные в одном файле: `app/globals.css`. В начале этого файла ты увидишь две строки:

```css
@import "tailwindcss";
```

и блок под названием `@theme inline`. Именно этот блок превращает переменные в классы Tailwind. Так `--color-primary` становится классом `bg-primary` или `text-primary`. Ты меняешь значения в `globals.css`, и каждый класс обновляется по всему приложению.

Вот важная идея: **токены редактируются в `globals.css`, а не в JavaScript-конфиге.**

## Цвета

Landed — тёмная тема: глубокий charcoal, лососёвый оранжевый и светло-голубой.

```markdown
## Colors
- Primary (salmon):  #f4a988   (hover #ef9d78, on-primary #1a1a1a)
- Canvas (page bg):  #0d0d0d
- Surfaces:          #1a1a1a / #242424 / #2c2c2c
- Ink (text):        #ffffff → muted #c4c4c4 → subtle #909090 → tertiary #6b6b6b
- Accent blue:       #c5d8e1
- Accent mint:       #b8d4c8
- Success:           #a8c8b8
```

Salmon — основной цвет: кнопки, активная навигация, выделенная карточка. Charcoal — фон страницы. Шкала ink идёт от яркого белого текста вниз до бледного tertiary.

### Цвета статусов

У Landed также есть цвет для каждого статуса заявки. Они управляют бейджами статуса на каждой карточке:

```markdown
## Status badge colors
- saved      → gray on #242424
- applied    → blue    (#c5d8e1)
- screening  → soft blue
- interview  → salmon  (#f4a988)
- offer      → mint    (#b8d4c8)
- rejected   → muted red (#d89090)
- withdrawn  → faint gray
```

Поскольку это токены, один и тот же interview salmon появляется на карточке Канбана, на бейдже и на таймлайне — никогда три разных оранжевых.

## Шрифты

```markdown
## Typography
- Sans (everything): Strichpunkt Sans
- Mono (code, numbers): JetBrains Mono
```

Оба грузятся из Google Fonts в начале `globals.css`. Используй sans-шрифт для всего обычного текста и mono-шрифт для деталей вроде кода.

## Типографическая шкала

Размеры тоже токены, чтобы заголовки и основной текст оставались согласованными:

```markdown
## Type scale
- Display: 2.25rem
- H1: 1.625rem
- H2: 1.25rem
- H3: 1.0625rem
- Body: 0.9375rem
- Small: 0.8125rem
- XS: 0.6875rem
- Chat: 0.75rem
```

Есть соответствующие вспомогательные классы вроде `.text-h1`, `.text-body` и `.text-chat`, чтобы ты не угадывал размеры.

## Скругления и отступы

```markdown
## Border radius
- xs 4 · sm 6 · md 8 · lg 10 · bento 12 · xl 14 · composer 16 · pill 9999

## Spacing
- page 2rem · section 1.25rem · card 1.25rem · block 1rem · inline 0.75rem · tight 0.5rem
```

Карточки используют скругление bento (12px). Плавающий композер чата использует скругление composer (16px). Бейджи и аватары используют скругление pill (полностью круглое). Отступы следуют шкале — никогда случайных значений в пикселях.

## Посмотри вживую

Тебе не нужно всё это воображать. В Landed встроена страница-витрина дизайна. Запусти приложение и открой **http://localhost:3009/design**. Эта страница (из `app/design/page.tsx` и `components/design-system/showcase.tsx`) показывает цвета, оболочку приложения, карточки и бейджи статусов в одном месте. Это самый быстрый способ проверить, что токен выглядит правильно.

## Пример правила для ИИ

Когда дизайн-система готова, добавь правило, чтобы ИИ всегда ей следовал. Что-то вроде:

```markdown
## Design rules
- Always use tokens from app/globals.css. Never pick a raw hex color.
- Page background is bg-canvas (#0d0d0d). Cards use the bento surface and radius.
- Primary actions use bg-primary (salmon #f4a988) with text-on-primary.
- Status badges use the per-status tokens (interview = salmon, offer = mint, etc.).
- Body text uses Strichpunkt Sans. Numbers and code use JetBrains Mono.
- Use the spacing scale (page / section / card / block). No random pixels.
```

С этим на месте ИИ тянется к `bg-canvas` и `text-primary` вместо того, чтобы придумывать новые цвета на каждом экране.

## Советы

- Поменяй цвет один раз в `globals.css` — и он обновится везде. В этом весь смысл токенов.
- Если ИИ когда-нибудь напишет сырой hex вроде `#3b82f6`, останови его и укажи обратно на токены.
- Держи страницу `/design` открытой во вкладке, пока строишь — это твоя быстрая визуальная проверка.
