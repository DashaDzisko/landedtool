## What is Storybook

Storybook is an isolated workshop for your components. It lets you open one component at a time and see it on its own, in all its states, without running the whole app.

Think of it like this. Normally, to see a button you have to run JobTracker, sign in, open a page, and find where the button appears. With Storybook, you just open the Button and look at it: the default state, the disabled state, the loading state, the hover state - all side by side.

## Why it fits vibecoding

JobTracker is built with **atomic design**. You build small pieces first, then combine them:

- **atoms** - the smallest pieces (button, input, badge, spinner)
- **molecules** - a few atoms together (chat-composer, form-field, status-badge)
- **organisms** - bigger blocks (kanban-board, chat-panel, application-form)

Storybook is perfect for this way of working:

- **Build bottom-up.** Make an atom, check it in Storybook, then use it inside a molecule.
- **Check each piece in isolation.** If the badge looks wrong, you fix it in the workshop, not by digging through the whole app.
- **Show the AI what "correct" looks like.** When a component works in Storybook, you have a clear, isolated example. It is much easier to tell AI "the Button should look like this" when the Button stands alone.

It also catches problems early. The a11y addon (`@storybook/addon-a11y`) flags accessibility issues, like poor color contrast, right in the workshop.

## How to run it

Start the workshop:

```bash
npm run storybook
```

This opens Storybook at **http://localhost:6006**. You will see a sidebar of all the components. Click one to view it. Change its props (called "controls") to see different states live.

Build a static version (a folder of plain HTML you can host or share):

```bash
npm run build-storybook
```

This writes the output to a folder called `storybook-static/`.

## The lighter option: /design

JobTracker also has a simpler, in-app showcase. Run the app and go to **/design**. It renders the design system on a single page (the code is in `components/design-system/showcase.tsx`).

Which to use?

- Use **/design** for a quick look at the tokens and components inside the real app, with the real styles.
- Use **Storybook** when you want to poke at one component's states, flip controls, and check accessibility in isolation.

## About storybook-static/

`storybook-static/` is a **generated** folder. It is output, not source code you wrote. So:

- It should be in `.gitignore` (do not commit it).
- It should be excluded from linting (do not lint generated files).

If you see lint errors or a huge diff coming from `storybook-static/`, that is the sign it slipped past `.gitignore`. Add it back and remove it from Git.

## Tips

- Keep Storybook running in a second terminal tab while you build a component. Save the file, and the workshop updates instantly.
- Add a story for each new atom and molecule. It is the fastest way to check every state without clicking through the app.
- Use the a11y addon to catch contrast and label problems before they reach a page.
- Never commit `storybook-static/`. It is generated - rebuild it any time with `npm run build-storybook`.
