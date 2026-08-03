

## Почему структура файлов важна

AI читает твои файлы, чтобы понять проект. Если файлы организованы, AI быстро находит нужное. Если файлы в беспорядке, AI путается. Он создаёт дубликаты файлов. Кладёт код не туда. Забывает, где что лежит.

Чистая структура экономит тебе часы на исправлении ошибок.

## Структура Landed

Вот настоящая структура нашего трекера вакансий. Выглядит как много всего, но у каждой папки одна понятная задача:

```
JobTracker/
  app/
    (app)/                 # the signed-in shell (chat + Kanban)
      layout.tsx  page.tsx  settings/  applications/
    (auth)/                # sign-in, sign-up, privacy, terms
    api/
      chats/route.ts       # create and list chats
      chats/[chatId]/      # the streaming chat agent endpoint
    design/page.tsx        # in-app design-system showcase (/design)
    promo/                 # marketing landing page
    layout.tsx  globals.css
  components/
    atoms/                 # smallest parts: button, input, badge, text
    molecules/             # small combos: status-badge, message-bubble
    organisms/             # big blocks: kanban-board, chat-panel
    providers/             # shared state (applications, search)
    ui/                    # Radix wrappers: dialog, select, dropdown
  lib/
    ai/                    # the chat agent: prompts, tools, streaming
    db/                    # database calls: applications, chats, notes
    supabase/              # Supabase clients (client, server)
  types/                   # shared types: application, chat, user
  supabase/migrations/     # SQL: tables, RLS, storage
  proxy.ts                 # refreshes the Supabase session
```

### Что делает каждая верхняя папка

- **/app** — Твои страницы и API-маршруты. Группы маршрутов вроде `(app)` и `(auth)` объединяют страницы, не меняя URL. В `api/` лежит серверный код, например эндпоинт чат-агента.
- **/components** — Переиспользуемый UI, собранный снизу вверх: **атомы -> молекулы -> организмы**. Маленькие части складываются в бо́льшие. В `providers/` лежит общее состояние, а в `ui/` — обёртки над Radix.
- **/lib** — Логика, которая не UI. `ai/` — это чат-агент, `db/` общается с базой данных, `supabase/` настраивает клиенты Supabase.
- **/types** — Общие типы TypeScript, например тип `Application` и его статусы.
- **/supabase** — Настройка базы данных в виде SQL-миграций, включая Row Level Security.

## Как описать свою структуру для AI

Положи короткую версию этого в свой `CLAUDE.md`. AI прочитает её и будет знать, куда класть новые файлы.

```markdown
## Project structure
- /app - pages, layouts, and API routes
- /components/atoms - smallest UI parts (button, badge, input)
- /components/molecules - small combos (status-badge, message-bubble)
- /components/organisms - big blocks (kanban-board, chat-panel)
- /lib/ai - the chat agent
- /lib/db - database calls
- /types - shared types
```

Ты также можешь добавить правила о том, куда что идёт:

```markdown
## File rules
- New pages go in /app
- A reusable part starts as an atom, then moves up if it grows
- Each component has its own folder
- Database calls go in /lib/db, never inside a component
```

## Что происходит, когда AI теряется

Признаки того, что AI запутался в твоей структуре:

- Он создаёт новый файл вместо того, чтобы отредактировать существующий.
- Он кладёт организм в /atoms или вызов базы данных внутрь компонента.
- Он импортирует из пути, которого не существует.
- Он создаёт дубликаты файлов со слегка разными именами.

### Как это исправить

1. Скажи AI, где файл. «The status badge is in /components/molecules/status-badge.»
2. Обнови свой `CLAUDE.md` более чёткой информацией о структуре.
3. Если AI создал файлы не в том месте, попроси их переместить. «Move this card from /atoms to /organisms/dashboard.»

## Советы

- Держи структуру плоской. Двух-трёх уровней достаточно.
- Один компонент на папку. Не пихай несколько в один файл.
- Соблюдай атомарный порядок: сначала атомы, потом молекулы, потом организмы.
- Когда проект растёт, обновляй `CLAUDE.md`, чтобы AI оставался в курсе.
