

## Зачем нужны правила

Когда ты работаешь с AI, он старается помочь. Но он много угадывает. Берёт случайные цвета. Добавляет функции, которых ты не просил. Пишет код в стиле, который тебе не нравится.

Правила это исправляют. Правила говорят AI ровно то, как ты хочешь, чтобы всё было сделано. Каждый раз.

## Виды правил

### Правила проекта

Они описывают твой проект. Что это, для кого, как должно выглядеть.

Примеры:
- «Landed is a chat-first job application tracker.»
- «Дизайн тёмный. Глубокий угольный фон, лососевый акцент.»
- «Дашборда нет. Статистика приходит из чат-агента.»

### Правила по коду

Они говорят AI, как писать код. Какие инструменты использовать. Каким паттернам следовать.

Примеры:
- «Use Tailwind CSS v4 for styling.»
- «Components follow atomic design: atoms -> molecules -> organisms.»
- «Use TypeScript, not JavaScript.»
- «Never expose OPENAI_API_KEY to the client.»

### Правила по дизайну

Они защищают твои решения по дизайну. Цвета, шрифты, отступы, вёрстку.

Примеры:
- «Primary color is #f4a988 (salmon). Do not change it.»
- «Design tokens live in app/globals.css as CSS variables — never hardcode hex in components.»
- «Fonts are Strichpunkt Sans for text and JetBrains Mono for code.»
- «Use the spacing tokens (page, section, card, block). Do not invent new values.»

## Куда класть правила

У тебя есть три места:

### 1. В файл CLAUDE.md

Это лучшее место для правил, которые применяются всегда. AI читает этот файл в начале каждого разговора.

```markdown
## Rules
- Design tokens live in app/globals.css. Never hardcode hex in components.
- Components follow atomic design: atoms -> molecules -> organisms.
- Every Supabase table must have RLS enabled.
```

### 2. В отдельные файлы правил

Некоторые инструменты (например, Cursor) позволяют создавать `.cursorrules` или другие файлы правил. Они работают так же. AI читает их и следует им.

### 3. В промпт

Ты также можешь добавить правила прямо в сообщение. Это удобно для разовых правил, которые применяются только к одной задаче.

«Build a status badge. Use the status color tokens from globals.css. No inline hex.»

## Хорошие правила против плохих

### Плохие правила

- «Сделай красиво.» (Слишком расплывчато. Красиво как?)
- «Используй лучшие практики.» (AI не знает твою версию лучших практик.)
- «Будь аккуратен с API-ключом.» (Что значит «аккуратен»?)

### Хорошие правила

- «Primary color is #f4a988 (salmon). Do not change it.»
- «Never expose OPENAI_API_KEY to the client.»
- «Every Supabase table must have RLS enabled.»

## Паттерн

Хорошие правила следуют этому паттерну:

**Что** + **Где** + **Как**

- «Use the salmon token (что) for primary buttons (где) via `bg-primary` (как).»
- «Add a typing indicator (что) inside the chat panel (где) while the agent is streaming (как).»

## Начинай с малого

Тебе не нужны 50 правил в первый же день. Начни с 5–10 самых важных правил. Добавляй ещё по мере того, как узнаёшь, где AI ошибается.

Каждый раз, когда AI делает что-то, что тебе не нравится, напиши правило, чтобы предотвратить это в следующий раз.
