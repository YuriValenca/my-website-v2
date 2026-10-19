# my-website-v2: Yuri's personal portfolio

Next.js (App Router) + TypeScript + Emotion, with TanStack Query for data fetching. Each portfolio project lives under `src/app/projects/<name>/`; shared pieces live in `src/shared/` (components, hooks, theme, utils, assets).

- **PokeGrid** (`projects/poke-grid`): Pokedoku-style puzzle on top of PokéAPI. Done.
- **Screenlog** (`projects/screenlog`): movie/TV/people browser on top of the TMDB API. In progress.

The goal is a portfolio: code quality and a polished, working UX matter more than feature count. Prefer cutting scope over shipping half-done screens.

## Git: hard limits

- Yuri is the only developer. Work happens on feature branches (`feat/<project>`) and is merged into `main` through PRs.
- The furthest you go is `git add` (staging).
- Follow-up changes are never staged: if Yuri asks for a change on top of something already staged, leave the new edits unstaged. He diffs, tests and commits them himself. This includes renames/moves: create/delete files in the working tree, never `git mv`/`git rm`.
- **Never** `git commit`, **never** `git push`, never open or merge PRs unless Yuri explicitly asks.
- Always end a finished change with a suggested commit message, in text only (never run it). If the change mixes unrelated concerns, suggest a split into several commits and list which files go in each. Format: `<type>: :<gitmoji>: <Imperative sentence in English, capitalized>`, a single line with no body and no trailing period, max 72 characters, one concern per commit.
  - Types: `feat` (new capability), `fix` (correction or improvement), `refactor` (restructure with no behavior change), `system` (build, version, dependencies, deploy).
  - Gitmojis: see [.github/commit_style_guide.md](.github/commit_style_guide.md). Most used: `:sparkles:` feature, `:bug:` bug fix, `:nail_care:` UI/UX, `:art:` structure/format, `:hammer:` fixes and refactors, `:racehorse:` performance, `:ok_hand:` small improvement, `:file_folder:` move files, `:milky_way:` images/icons, `:construction:` work in progress, `:scissors:` removal.
- When a feature branch is ready, offer a PR description (text only).

## Code style

- Clean Code: small, well-named functions, readable and broken down.
- If doing it right needs a big refactor, don't do it inline. Leave a `// TODO:` and flag it.
- Comments only for:
  - highly counter-intuitive snippets
  - nasty workarounds
  - `// TODO:` marking improvements or tech debt
  - nothing else; remove obvious or narrative comments when touching code.
- **Everything in English**: identifiers, file names, comments and user-facing strings.
- Follow the existing structure: one folder per component with `index.tsx` + `style.ts` (Emotion styled components). Inside a project, non-route folders use Next.js route groups: `(api)`, `(components)`, `(hooks)`, `(types)`, `(helpers)`, `(context)`.
- Reuse what's in `src/shared/` (e.g. `useBreakpoint`, `Pagination`, `Spinner`, `theme`) before writing new versions.

## Test plan after every change

At the end of every change (code written, config changed, etc.), give a step-by-step test plan:

- **Before**: what was happening, and how to reproduce it.
- **After**: how it behaves now, and how to verify it.
