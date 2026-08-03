

## What this prompt does

This prompt asks AI to build the landing page for Landed. A landing page explains what the app does and gets people to try it. It is the first thing a visitor sees before they sign in.

Landed already has this page under `app/promo/`. It uses the same dark theme and tokens as the app.

## The prompt

Copy this and adjust the wording to taste. The app name and value below are the real ones.

---

```
Build a landing page for our app "Landed".

Landed is a chat-first AI job application tracker. Instead of filling in forms all day, you talk to an agent. It reads your applications and helps you decide what to do next. Your applications live on a status board (Kanban) that you can drag cards across.

Use a dark theme. Page background #0d0d0d, text #ffffff, salmon #f4a988 for the main accent and buttons. Fonts: "Strichpunkt Sans" for text, "JetBrains Mono" for small labels. Mobile first: one column on phones, wider on desktop.

## Hero section

A large heading: "Track every job application. Let the agent do the thinking."

Below it, a short line: "Landed is a chat-first job tracker. Ask the agent about your pipeline, and watch your applications move across a status board."

Below that, one salmon button: "Get started". It links to /sign-up.

On the right (desktop) or below (mobile), show a preview of the app: a chat pane on the left and a board of application cards on the right. A simple mockup or placeholder box is fine.

## How it works section

Three steps in a row (one column on mobile):
1. Add a role - "Save a job you found, or paste the details."
2. Ask the agent - "Ask Landed what to prioritise, or to draft a follow-up."
3. Move it forward - "Drag the card from Applied to Interview to Offer as things happen."

Each step has a number, a title, and a short line.

## Features section

Three feature cards. Use the card style from the design system:
1. "Chat agent" - "Ask about your pipeline in plain words. The agent reads your applications and replies with charts and cards."
2. "Status board" - "See every application as a card in one of 7 columns: saved, applied, screening, interview, offer, rejected, withdrawn."
3. "Status timeline" - "Every application keeps a history, so you always know when things changed."

## Call to action section

A short section with a heading: "Ready to get organised?"
One salmon button: "Get started". Links to /sign-up.
Use a slightly lighter surface color (#1a1a1a) behind it.

## Footer

Simple footer:
- "Landed" on the left
- Links: Privacy, Terms
- A small "Built with AI" note on the right

## General rules

- Use the design system for all colors, fonts, and spacing.
- Keep it clean with plenty of breathing room.
- No heavy animations for now. A soft fade-in is fine.
- Use placeholder boxes for any images.
```

---

## How to use it

1. Build your design system page first (see 01). Then AI reuses the right tokens here.
2. Paste the prompt into your AI tool.
3. Open the page and check it on both desktop and a phone-size window.
4. Fix the copy one line at a time. "Make the hero heading shorter." "Change the button to 'Try Landed'."

## Tips

- The whole promise of Landed is "chat + board." Keep both in the hero preview so visitors get it right away.
- Do not aim for perfect in one prompt. Get the sections in place first, then adjust wording and spacing.
- Check the salmon button on the dark background. It should feel warm and stand out, not glow too hard.
