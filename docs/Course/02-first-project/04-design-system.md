

## Why a design system comes first

You are a designer. You know colors, fonts, and spacing should be consistent. But AI does not know your preferences. If you build without a design system, AI picks a random blue on one screen and a random gray on the next.

So Landed defines its design system **before** building pages, and keeps it in one place. Then AI follows it everywhere.

## Where the tokens live

In Tailwind CSS v4 there is **no `tailwind.config.ts`**. The design tokens are CSS variables in one file: `app/globals.css`. At the top of that file you will see two lines:

```css
@import "tailwindcss";
```

and a block called `@theme inline`. That block is what turns the variables into Tailwind classes. So `--color-primary` becomes the class `bg-primary` or `text-primary`. You edit the values in `globals.css`, and every class updates across the app.

This is the important idea: **tokens are edited in `globals.css`, not in a JavaScript config file.**

## The colors

Landed is a dark theme: deep charcoal, salmon orange, and light blue.

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

Salmon is the primary color — buttons, active nav, the featured card. Charcoal is the page. The ink scale goes from bright white text down to faint tertiary text.

### Status colors

Landed also has a color for each application status. These drive the status badges on every card:

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

Because these are tokens, the same interview salmon appears on the Kanban card, the badge, and the timeline — never three different oranges.

## The fonts

```markdown
## Typography
- Sans (everything): Strichpunkt Sans
- Mono (code, numbers): JetBrains Mono
```

Both load from Google Fonts at the top of `globals.css`. Use the sans font for all normal text and the mono font for code-like details.

## The type scale

Sizes are tokens too, so headings and body text stay consistent:

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

There are matching helper classes like `.text-h1`, `.text-body`, and `.text-chat` so you do not guess sizes.

## Radius and spacing

```markdown
## Border radius
- xs 4 · sm 6 · md 8 · lg 10 · bento 12 · xl 14 · composer 16 · pill 9999

## Spacing
- page 2rem · section 1.25rem · card 1.25rem · block 1rem · inline 0.75rem · tight 0.5rem
```

Cards use the bento radius (12px). The floating chat composer uses the composer radius (16px). Badges and avatars use the pill radius (fully round). Spacing follows the scale — never random pixel values.

## See it live

You do not have to imagine all this. Landed has a design showcase page built in. Run the app and open **http://localhost:3009/design**. That page (from `app/design/page.tsx` and `components/design-system/showcase.tsx`) shows the colors, the app shell, the cards, and the status badges in one place. It is the fastest way to check that a token looks right.

## Example rule for AI

Once the design system exists, add a rule so AI always follows it. Something like:

```markdown
## Design rules
- Always use tokens from app/globals.css. Never pick a raw hex color.
- Page background is bg-canvas (#0d0d0d). Cards use the bento surface and radius.
- Primary actions use bg-primary (salmon #f4a988) with text-on-primary.
- Status badges use the per-status tokens (interview = salmon, offer = mint, etc.).
- Body text uses Strichpunkt Sans. Numbers and code use JetBrains Mono.
- Use the spacing scale (page / section / card / block). No random pixels.
```

With this in place, AI reaches for `bg-canvas` and `text-primary` instead of inventing new colors on every screen.

## Tips

- Change a color once in `globals.css` and it updates everywhere. That is the whole point of tokens.
- If AI ever writes a raw hex like `#3b82f6`, stop it and point back to the tokens.
- Keep the `/design` page open in a tab while you build — it is your quick visual check.
