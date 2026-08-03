

## What this prompt does

This prompt asks AI to build a design system showcase page for Landed. It is one page where you can see all your building blocks in one place: colors, text styles, buttons, inputs, status badges, and cards.

Landed already has this page. It lives at `/design` and is rendered by `components/design-system/showcase.tsx`. It is useful because you can check that everything looks consistent before you build real screens. The tokens come from `app/globals.css`, so the page always shows the real values.

## The prompt

Copy this. The colors, fonts, and sizes below are the real Landed tokens, so you can use them as-is.

---

```
Build a design system page at /design.

This page shows all the reusable pieces of our app in one place. It uses a dark theme. Each section has a large heading, a short description, and live examples.

## Page basics

- Page background: #0d0d0d (our canvas color). Text: #ffffff.
- Fonts: "Strichpunkt Sans" for everything, "JetBrains Mono" for code and numbers.
- Center the content, max width 1100px. Separate sections with lots of space.

## Colors

Show colors as a grid of squares. Under each square show the name and hex.

- Primary (salmon): #f4a988, hover #ef9d78, text on primary #1a1a1a
- Canvas (page): #0d0d0d
- Surface 1: #1a1a1a, Surface 3: #242424, Surface 4: #2c2c2c
- Ink (text): #ffffff, muted #c4c4c4, subtle #909090, tertiary #6b6b6b
- Accent blue: #c5d8e1, accent mint: #b8d4c8, success: #a8c8b8

## Typography

Show one line of sample text for each style, with the name and size next to it:

- Display: 2.25rem, bold
- H1: 1.625rem, semibold
- H2: 1.25rem, semibold
- H3: 1.0625rem, medium
- Body: 0.9375rem, regular
- Small: 0.8125rem
- XS: 0.6875rem
- Mono: JetBrains Mono, 0.8125rem

## Buttons

Show these button variants, each in normal and hover state:
- Primary: salmon background (#f4a988), dark text (#1a1a1a)
- Secondary: transparent with a thin hairline border, white text
- Disabled: dimmed, not clickable

Buttons use 8px radius (our radius-md).

## Inputs

Show a text input with a label, an input with an error message, and a textarea.
Inputs sit on surface (#1a1a1a), have a hairline border and 8px radius.

## Status badges

Show all 7 application statuses as small pills. Each has its own background and text color:
- saved: bg #242424, text #909090
- applied: bg rgb(197 216 225 / 0.20), text #c5d8e1
- screening: bg rgb(197 216 225 / 0.14), text #b5ccd6
- interview: bg rgb(244 169 136 / 0.22), text #f4a988
- offer: bg rgb(184 212 200 / 0.18), text #b8d4c8
- rejected: bg rgb(220 140 140 / 0.14), text #d89090
- withdrawn: bg #1a1a1a, text #6b6b6b

## Cards

Show one application card:
- Surface background (#1a1a1a), 12px radius, a soft shadow, a hairline border
- A small company mark (first letter in a square), company name, role
- A status badge, a location, and a date applied

## Radius scale

Show the corner radius steps as rounded boxes: 4, 6, 8, 10, 12, 14, 16 px, and a full pill.

## Spacing scale

Show the spacing steps as colored bars: tight 0.5rem, inline 0.75rem, block 1rem, card 1.25rem, page 2rem.
```

---

## How to use it

1. Make sure your tokens live in `app/globals.css`. This is Tailwind v4, so there is no `tailwind.config.ts` — the colors and sizes are CSS variables inside the `@theme inline` block.
2. Paste the prompt into your AI tool.
3. Open `http://localhost:3009/design` and check that colors, fonts, and badges match.
4. Fix one thing at a time. For example: "The interview badge should be more orange. Use text #f4a988."

## Tips

- Change a token in `globals.css` once and every section on this page updates. That is the point.
- Keep the 7 status badges here. They are the heart of the app, so you want to see them together.
- Add new pieces to this page as the app grows: avatars, dropdowns, the chat message bubble.
- This page is also mirrored in Storybook (`npm run storybook`, port 6006) if you want each piece on its own.
