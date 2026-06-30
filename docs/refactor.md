# Refactor Prompt

Copy and paste the prompt below into Claude Code (or any agent with full repo access) when you want to refactor part of JobTracker safely.

Refactoring means **changing how the code is written, not what it does**. If the app behaves any differently after, it is not a refactor — it is a rewrite, and rewrites need a separate plan.

---

## The prompt to use

> You are refactoring the JobTracker codebase (Next.js 16 + Supabase + TypeScript).
> Your job: make the code cleaner, smaller, or easier to read **without changing what the app does**.
>
> Follow the rules below exactly. If a rule blocks you, **stop and ask the user** — do not work around it.
>
> 1. Work on a new git branch named `refactor/<short-topic>`. Never refactor on `main`.
> 2. Before you touch anything, run the safety net and write down the result:
>    - `npm run build` → must pass
>    - `npm test` → must pass
>    - `npx tsc --noEmit` → must pass
>    These are your "before" numbers. The same three must pass at every commit.
> 3. Pick **one** thing to refactor at a time. Not three. Not "and while I'm here". One.
> 4. After each change, run the safety net again. If anything turns red, **revert immediately** and tell the user.
> 5. Make small commits. One idea per commit. Each commit must be green on its own.
> 6. Do not change behavior. No new features. No "improvements" to the UI. No removing things that "look unused" without proving it.
> 7. At the end, write a short report (see "End of the report" below).

---

## Pick the right kind of refactor

Different refactors carry different risk. Use this table to pick what you're doing — and tell the user before you start.

| Type | What it is | Risk | Example |
|---|---|---|---|
| 🟢 Rename | Rename a variable, function, file | Low | `cv` → `resume` |
| 🟢 Extract | Pull a function or component out of a bigger one | Low | Extract `<ApplicationCard>` from a page |
| 🟢 Inline | Replace a tiny helper with its body | Low | Remove a one-line wrapper |
| 🟡 Move | Move a file to a better folder | Medium | `lib/foo.ts` → `lib/applications/foo.ts` |
| 🟡 Type-tighten | Replace `any`, add narrower types | Medium | `unknown` → `Application` |
| 🟡 Dead-code removal | Delete code you can prove is unused | Medium | Unused export, orphan component |
| 🔴 Restructure | Change file/folder layout for a whole feature | High | Reorganize `components/organisms/*` |
| 🔴 Replace a pattern | Swap one approach for another across many files | High | Class component → hook |
| 🔴 Touch auth / middleware / DB queries | Anything in `app/auth/`, `lib/supabase/`, `middleware.ts`, `app/api/` | High | Refactor session handling |

**Rule:** the higher the risk, the smaller the slice. A 🔴 refactor should be split into many 🟢 commits.

---

## Things you must NOT do during a refactor

- ❌ Mix logic changes with formatting/reordering. A reformat commit must be pure reformat.
- ❌ Add new abstractions "for the future". Three similar lines is better than a premature wrapper.
- ❌ Delete code that "looks unused" without grep-confirming it has zero callers.
- ❌ Touch generated files (`storybook-static/`, `.next/`, `tsconfig.tsbuildinfo`).
- ❌ Bump dependency versions. That's a separate task with its own risk.
- ❌ Refactor and rebase/squash at the same time.
- ❌ Change public API of anything imported across the app without checking every call site.
- ❌ Edit `.env.local` or any secret.

---

## Extra-careful zones

These parts of the repo affect user data, sessions, or money paths. **Stop and ask the user before touching them**, even for a 🟢 rename:

- `middleware.ts` and `lib/supabase/middleware.ts` — controls who can access what
- `lib/supabase/server.ts`, `lib/supabase/client.ts` — auth clients
- `app/auth/**` — login flow, magic links, callback
- `app/api/**` — server routes that hit the database
- `app/(auth)/sign-in/**`, `app/(auth)/sign-up/**`
- `supabase/**` — DB schema and migrations
- Anything that reads from `process.env.*`

---

## How to verify a refactor really was a refactor

After every commit, you must be able to answer **yes** to all of these:

1. Did `npm run build`, `npm test`, and `npx tsc --noEmit` all pass?
2. Did I run the app and use the feature I touched, and did it behave **exactly** like before?
3. Is the diff smaller than ~300 lines? (If bigger, you probably bit off too much — split.)
4. If I asked a coworker "what does this commit do?", could they say it in one sentence?

If any answer is no, the commit is not ready.

---

## A safe recipe (use this for each slice)

1. `git checkout -b refactor/<topic>` off the latest `main`.
2. Run safety net. Write "before" results in a scratch note.
3. Make **one** small change.
4. Run safety net again. If green, `git add` only the files you meant to change, commit with a clear message: `refactor(scope): what you did`.
5. If you find yourself wanting to "also fix" something, **stop**. Note it in a TODO list and finish the current slice first.
6. Run the app locally. Click through the feature you touched. Watch the browser console for new errors or warnings.
7. Repeat from step 3 for the next slice.
8. When done, open a PR. The PR description must say:
   - What kind of refactor (🟢 / 🟡 / 🔴)
   - What did NOT change (behavior, public API, env, dependencies)
   - How you verified

---

## End of the report

After the refactor is done, write a final section called **"Refactor report"** with:

- **What was refactored:** one paragraph.
- **What did NOT change:** list of things that stayed identical (behavior, API surface, env, dependencies, DB schema).
- **Safety net results:** before vs after (build, tests, typecheck).
- **Files touched:** count and list, grouped by change type.
- **Anything skipped:** stuff you noticed but did not fix, so the user can decide whether to do it later.
- **Rollback plan:** the single git command to undo this PR if something breaks in prod.
