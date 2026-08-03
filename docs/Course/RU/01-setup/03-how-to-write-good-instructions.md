

## Почему это важно

AI собирает то, о чём ты просишь. Не то, что ты имеешь в виду. Не то, что ты представляешь. То, что ты написал.

Если твои инструкции расплывчаты, результат будет случайным. Если твои инструкции ясны, результат будет близок к тому, что ты хочешь.

Умение писать хорошие инструкции — самый полезный навык в вайбкодинге.

## Правило 1: Будь конкретным

Говори ровно то, что хочешь. Добавляй детали.

**Плохо:** «Add an application card.»

**Хорошо:** «Add an application card. Show a colored status badge at the top, then the role, then the company, then the date applied. The status badge is the most glanceable thing, so it goes first.»

## Правило 2: По одной задаче за раз

Не проси пять вещей в одном сообщении. AI попробует сделать всё сразу и наделает ошибок.

**Плохо:** «Build the whole Kanban board with all seven columns, drag and drop, the application cards, the empty states, and the chat panel next to it.»

**Хорошо:** «Build one Kanban column. It has a heading with the status name and a count, then a vertical list of application cards below it.»

Когда AI закончит, переходи к следующей части.

## Правило 3: Говори, что хочешь

AI работает лучше с положительными инструкциями.

**Плохо:** «Don't use a random color for the badge.»

**Хорошо:** «Use the status color tokens from globals.css for the badge. For example `--status-interview-text` for the interview status.»

## Правило 4: Давай примеры

Если у тебя есть образец, поделись им. Скриншот, ссылку, набросок. AI понимает примеры быстрее, чем длинные описания.

«Make the chat message bubble similar to this screenshot. The agent's messages are on the left on a surface background. My messages are on the right.»

## Правило 5: Опиши результат

Скажи AI, как должен выглядеть итог. Это помогает ему проверить собственную работу.

«When this is done, I should see a status badge with a soft background and matching text color. It says the status name, like 'Interview', in small text with rounded pill corners.»

## Примеры «до и после»

### Пример 1: Бейдж статуса

**До:** «Add a status badge.»

**После:** «Add a status badge that shows one of the seven statuses: saved, applied, screening, interview, offer, rejected, withdrawn. Each status uses its own token pair from globals.css, like `--status-applied-bg` and `--status-applied-text`. The badge is a small pill with rounded corners and the status label inside.»

### Пример 2: Колонка Канбана

**До:** «Make a column.»

**После:** «Create one Kanban column for a single status. At the top is a header with the status name on the left and the number of applications on the right. Below it is a vertical stack of application cards with a small gap between them. If there are no cards, show an empty state message.»

### Пример 3: Пузырь сообщения в чате

**До:** «Build a chat bubble.»

**После:** «Build a chat message bubble. Agent messages sit on the left with a surface background. My messages sit on the right with the salmon primary background and dark text. Text uses the chat type size. Corners are rounded. Long messages wrap and keep some padding inside.»
