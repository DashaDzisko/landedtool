

## Проблема

AI ничего не запоминает. Каждый раз, когда ты открываешь новый чат, он забывает твой проект. Забывает твои правила. Забывает, какие технологии ты используешь. Приходится объяснять всё заново.

Это медленно и раздражает.

## Решение

Ты создаёшь специальный файл и кладёшь его в папку проекта. AI читает этот файл в начале каждого разговора. Теперь он знает твой проект, не спрашивая.

Представь это как короткий бриф, который ты даёшь новому человеку в команде в его первый день.

Разные инструменты используют разные имена файлов:

- **Claude Code** использует `CLAUDE.md`
- **Cursor** использует `.cursorrules`
- **Windsurf** использует `.windsurfrules`
- **Bolt** позволяет задать правила в настройках проекта

Идея одна и та же. Ты пишешь информацию о проекте и правила в файл. AI читает его и следует ему.

В этом руководстве мы называем его `CLAUDE.md`, но всё написанное работает для любого из этих файлов. Формат и содержание одинаковы. Меняется только имя файла.

## Что внутри писать

Твой `CLAUDE.md` должен отвечать на эти вопросы:

- **Что это за проект?** Одно-два предложения. Что делает приложение?
- **Какие технологии мы используем?** Перечисли фреймворк, язык и основные инструменты.
- **Как организованы файлы?** Опиши структуру папок.
- **Какого стиля мы придерживаемся?** Твои предпочтения по коду и дизайну.
- **Чего AI должен избегать?** То, что ты не хочешь, чтобы AI делал.

## Пример

Вот `CLAUDE.md` для Landed, нашего трекера вакансий:

```markdown
# Landed — AI job tracker

Landed is a chat-first job application tracker. A chat agent sits on
the left, a status Kanban of applications sits on the right.

## Tech stack
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase (database + auth)
- OpenAI (the chat agent)

## Project structure
- /app - pages, layouts, and API routes
- /components - atoms, molecules, organisms
- /lib - AI, database, and Supabase helpers
- /types - shared TypeScript types

## Rules
- Design tokens live in app/globals.css as CSS variables.
- Never hardcode hex colors in components.
- Primary color is salmon #f4a988. Do not change it.
- Build components bottom-up: atoms -> molecules -> organisms.

## Do not
- Do not add new packages without asking first.
- Do not expose OPENAI_API_KEY to the client. It is server-only.
- Every Supabase table must keep RLS enabled.
```

## Куда его класть

Положи `CLAUDE.md` в корень папки проекта. Это главная папка, где лежит весь твой код.

В этом репозитории конфиг агента уже хранится в папке `.claude/` (например, настройки dev-сервера в `.claude/launch.json`). Файл `CLAUDE.md` в корне репозитория — как раз то место, где жили бы правила проекта выше.

```
JobTracker/
  CLAUDE.md        <-- here
  .claude/
  package.json
  /app
  /components
  /lib
```

## Советы

- Держи файл коротким. Одной страницы достаточно.
- Обновляй его, когда проект меняется.
- Пиши простыми предложениями. AI понимает простой текст лучше, чем длинные абзацы.
- Можешь добавлять новые разделы, когда они понадобятся. Начинай с малого.
