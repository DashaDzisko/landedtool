

## Что такое системный промпт

Когда твоё приложение отправляет сообщение ИИ, ты можешь включить в него системный промпт. Это набор инструкций, который говорит ИИ, как себя вести. Пользователь его никогда не видит, но он влияет на каждый ответ.

Думай об этом как о брифинге ассистента перед его первым рабочим днём. Ты говоришь ему, кто он, что ему можно и нельзя трогать и как отвечать. В Landed этот ассистент — чат-агент, который сидит рядом с твоей доской заявок.

## Где это живёт

Landed собирает свой системный промпт в `lib/ai/prompts.ts`, в функции под названием `buildSystemPrompt`. Это не фиксированная строка. Каждый раз, когда ты отправляешь сообщение, приложение вставляет в промпт твой профиль и твои текущие заявки, так что агент всегда говорит о твоём реальном пайплайне. Этот контекст собирается в `lib/ai/context.ts`, а инструменты, которые агент может вызывать, определены в `lib/ai/tools.ts`.

Модель по умолчанию — `gpt-4o-mini` (задаётся через `OPENAI_MODEL`). API-ключ доступен только на сервере и живёт в маршруте API в `app/api/chats/[chatId]/route.ts` — он никогда не попадает в браузер.

## Системный промпт

Это близко к настоящему промпту, который использует Landed. Части в {фигурных скобках} заполняются живыми данными.

---

```
You are Landed, a concise job-search assistant inside a chat-first application tracker.

You help the user understand their pipeline, prioritise roles, draft follow-ups, and prepare for interviews. You have read-only access to their applications via tools — use tools when you need fresh or detailed data instead of guessing.

User profile:
{name, target roles, and CV summary}

Applications ({count}):
{a list of each application: role @ company (status) — location [id]}

Guidelines:
- Be direct and helpful. Short paragraphs; use bullet lists when comparing options.
- When showing a pipeline overview, stats, or a specific application card, call the matching show_* tool so the UI can render a rich widget beneath your reply.
- Do not invent applications or statuses — always use tools for facts.
- Salary, notes, and contacts may be sparse; say when data is missing.
- You cannot change application status or send email yet — suggest next steps in text, and use suggest_* tools only when the UI should offer a one-click action.
```

---

## Что делают эти правила

- **Только чтение.** Агент может смотреть на твои заявки, но не может их менять. Это держит его в безопасности: он может советовать, но не станет тихо передвигать карточку или менять статус.
- **Ничего не выдумывать.** Он не должен придумывать заявки или статусы. Если ему нужны факты, он вызывает инструмент. Это останавливает классический ответ «уверенно, но неверно».
- **show_* инструменты.** Когда агент хочет показать что-то насыщенное — график статистики, карточку заявки, шортлист — он вызывает инструмент `show_*`, и приложение рендерит этот виджет под ответом. Текст остаётся коротким; виджет несёт детали.
- **suggest_* инструменты.** Агент пока не может менять статус или отправлять письма. Вместо этого он может предложить действие в один клик (например, черновик письма), которое пользователь сам решит выполнить.

## Как это улучшить

Твой системный промпт никогда не окончательный. После того как поработаешь с приложением, ты заметишь разное:

- Ответы слишком длинные. Добавь правило: "Keep replies under 120 words unless the user asks for more."
- Агент забывает использовать виджет. Сделай правило жёстче: "Always call show_stats when the user asks how their search is going."
- Агент угадывает недостающие данные. Напомни ему: "If a field is empty, say so plainly. Do not fill it in."

Отредактируй `lib/ai/prompts.ts`, сохрани и попробуй тот же вопрос снова. Написать хороший системный промпт получается за несколько заходов. Это нормально.

## Советы

- Держи промпт в своём отдельном файле (`lib/ai/prompts.ts`), а не закопанным в маршруте API. Ты будешь править его часто.
- Промпт собирается заново на каждое сообщение с твоим живым профилем и заявками. Проверь его с полным пайплайном и с нулём заявок — оба варианта должны читаться хорошо.
- Более короткие промпты часто работают лучше. Если твой разросся больше страницы, вырежи те части, которым модель и так следует.
- Никогда не клади ключ OpenAI в промпт или куда-либо с префиксом `NEXT_PUBLIC_`. Он остаётся на сервере, в маршруте API.
