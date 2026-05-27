# CLAUDE.md

Project memory for Claude Code sessions in this repo. Read this fully at the start of every session. The rules here are authoritative - they outrank visual mockups, existing code that may violate them, and assumptions carried in from training data.

---

## Project

Personal portfolio + research site. Next.js 16 (App Router, React 19) with vanilla-extract for styles, Base UI for unstyled primitives, Framer Motion for animation. Strict TypeScript. Audience is ML researchers and hiring managers - visual register skews academic/editorial, not marketing/saas.

---

## Style conventions

All visual conventions are in `@docs/CONVENTIONS.md`. Any mention of 'conventions' in relation to application configuration, implementation, or styling should appear in this file. Read it before modifying any component, CSS, or markup. It governs typography, heading hierarchy, link/icon hover conventions (copper for interactive, teal for navigation), and icon sizing.

The conventions doc is your source of truth. If a visual reference (mockup, existing code) conflicts with it, follow the convention and flag the conflict/violation - do not silently match the violation. When adding a new primitive or visual pattern that isn't covered, surface the gap before implementing rather than inventing in place.  This is the single most common failure mode: design mockups arrive without convention context, and implementations override the shared style system to match them.

Before closing any session that introduced a new visual pattern, check whether CONVENTIONS.md needs updating to reflect it - if it does, flag it or update it before marking the work complete.

---

## Componentry & Architecture

Folder structure is the typical Next.js app router form, with the following specifics:
- `public`: Canonical usage of public - images, svgs, etc. that can be publicly downloaded.
- `src/components`
  - `./ui`: UI primitives
  - `./pages/<page>/`: page-specific components
  - `./navigation/`: Navigation-related components (no-explicitly interface elements)
- `src/content`: All page content which is not a public asset (i.e, images, svg content)
- `src/lib`
  - `./content`: Rendering logic for application content.
  - `./markdown`: Rendering logic for in-text Markdown. Heavily-tied to `src/components/ui/Markdown`.
  - `./theme`: vanilla-extract theming
  - `./styles`: utility theming definitions unrelated to app-level theming
  - `./types`:
  - Surface situations where new files do not fall into any of the existing categories.

### Styles

vanilla-extract only.
- No inline `style={}` for anything styleable via CSS, no styled-components, no Tailwind, no CSS modules. The only exception allowed to this rule is `global.css`, which is done for formatting purposes.
- Theme values come from `src/lib/theme/theme.css.ts` via the `theme` import. No raw hex codes, no raw `var(--font-*)` references in component CSS - use the theme token (`theme.color.*`, `theme.typography.fontFamily.*`, `theme.space._*`).
- Icons are rendered through `<Icon name="..." size="..." />`, never by importing raw SVG components directly. The registry + wrapper is the only legitimate path.
- Links are rendered through the link primitives (`TextLink`, `IconLink`, `IconButton`, `LinkPill`), not bespoke styled `<a>` tags. Each primitive encodes a hover convention - see CONVENTIONS.md.

### File Convention

All component folder names are upper-cased, other folder names are lower cased. *All* file names should be lowercased (Avoid Windows silently ignoring casing). Don't deviate from this layout.

---

## Editing approach

- Prefer surgical edits over rewrites. When a file works and one thing is wrong, fix that one thing.
- Discuss → plan → execute. For anything touching more than one component, a shared primitive, or the theme contract: state the plan before writing code and pause for confirmation.
- When a change touches a shared primitive and its call sites, update both in the same change. Don't leave the codebase with a new primitive API and stale call sites.
- Don't speculatively refactor adjacent code. If it's worth doing, it's worth its own discussion.
- No new dependencies without discussion. The current set is deliberately small.

---

## Content + data

- No synthetic, mock, placeholder, or example data in deliverable code. If a structure needs to exist before content does, leave it empty or behind a feature flag.
- Project content lives in `src/lib/content/projects/` as typed TS modules. Page-level static content lives in `src/content/`. Don't inline copy into components.

---

## Accessibility

- Every page renders exactly one `<h1>`. Heading levels never skip. See CONVENTIONS.md -> Heading hierarchy.
- Icons inside interactive elements need `aria-label` on the interactive element - the icon itself is `aria-hidden` by default via the Icon wrapper.
- Use semantic landmarks: `<main>`, `<section>`, `<nav>`, `<aside>`, `<footer>`. Each page has exactly one `<main>`.

---

## Commands

- `npm run dev` - local dev server
- `npm run build` - production build
- `npm run lint` - ESLint

Run lint and build before declaring a change complete. Fix lint warnings; don't suppress them.
