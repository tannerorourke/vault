# CLAUDE.md

Project memory for Claude Code sessions in this repo. Read this fully at the start of every session. The rules here are authoritative - they outrank visual mockups, existing code that may violate them, and assumptions carried in from training data.

Do not make any changes without reading all sections.

---

## Project

This is a personal portfolio + research site. The user (Tanner) has a Master's of AI and accredited research; this portfolio both showcases his work and acts as a hub for all his online content (code, papers, articles). The website's audience is ML researchers and hiring managers - visual register skews academic/editorial, not marketing/saas.

---

## Application Structure

Next.js 16 (App Router, React 19) with vanilla-extract for styles. Adhere to the following organization tightly:
- `public`: Canonical usage of public - images, svgs, etc. that can be publicly downloaded.
- `src/components`
  - `./ui`: UI primitives
  - `./pages/<page>/`: page-specific components
  - `./navigation/`: Application-level components, such as the `App Provider`, `next-view-transitions` page routing, and `Header` component.
- `src/content`: Page content which is not a public asset (i.e, images, svg content). See `#page-content` for instructions on changing page content.
- `src/lib`
  - `./content`: Rendering logic for application content.
  - `./markdown`: Rendering logic for in-text Markdown. Heavily-tied to `src/components/ui/Markdown`.
  - `./theme`: vanilla-extract theming
  - `./styles`: utility theming definitions unrelated to app-level theming
  - `./types`:

It is important to stop and surface situations where new files do not fall into any of the existing categories. 

Component folder's names are upper-cased, organization-driven folder's names are lower cased. *All* file names should be lowercased (Avoid Windows silently ignoring casing).

### Visual technology

The site uses vanilla-extract SSR styling. All styles run through the theme contract and its constituents in `src/lib/theme/theme.css.ts`.
- Always prefer utilizing theme values. Never inline `style={}` for anything styleable via CSS, no styled-components, no Tailwind, no CSS modules.
- No raw hex codes, no raw `var(--font-*)` references in component CSS - use the theme token (`theme.color.*`, `theme.typography.fontFamily.*`, `theme.space._*`)

---

## UI Content

Unique Project content is hosted staticly via `src/lib/content/projects/`. Content for other pages is similarly hosted in named folders of `src/lib/content`. The JSON and strictly typed (`ProjectContent`). Page-level static content lives in `src/content/`.

Rules by content-type:
- **text**: Rendered through `<Text>` or `Eyebrow`.
  - Any text which is to be configurable through `src/lib/content` should be passed through the `<Markdown>` component either directly or via supporting components.
- **icons**: Rendered through `<Icon name="..." size="..." />`, and its higher order `IconButton`, and `IconLink` components, never by importing raw SVG components directly. The registry + wrapper is the only legitimate path.
- **Links**: Rendered through the link primitives (`TextLink`, `IconLink`, `IconButton`), not bespoke styled `<a>` tags. Each primitive encodes a hover convention - see CONVENTIONS.md.

New/changes to copy should never be inlined into components.

---

## IMPORTANT: Components & Styling

It is incredibly important to adhere to stated component definition conventions. If a convention is not listed below, reference existing/similar implementations for reference. Never assume a new convention or fallback to system defaults when producing new code. If this is not clear, stop for confirmation (ex: "This is a new use case, should I render this text with via `<Markdown textProps={{ ...props }}>` or via a boilerplate `<Text>` component?")

### Component Conventions

All visual conventions are in `@docs/CONVENTIONS.md`. This document is your running document as a source of truth. If a visual reference (mockup, existing code) conflicts with it, follow the convention and flag the conflict/violation - do not silently match the violation. When adding a new primitive or visual pattern that isn't covered, surface the gap before implementing rather than inventing in place.
- This is the single most common failure mode. design mockups arrive without convention context, and implementations override the shared style system to match them.
- Any mention of 'conventions' in relation to application configuration, implementation, or styling should appear in this file. Read it before modifying any component, CSS, or markup. It governs typography, heading hierarchy, link/icon hover conventions (copper for interactive, teal for navigation), and icon sizing.
- 

### Choosing Conventions

If existing code does not follow convention, agressively scrutinize by checking `@docs/CONVENTIONS.md` before following a convention. One off use cases (for example: a bespoke `<a>` tag) should never be used as exemplary.

If a convention is not described in this conventions document, clarify its purpose and offer to update the document to ensure it remains current and robust. 

Before closing any session that introduces a new pattern, check whether CONVENTIONS.md needs updating to reflect it - if it does, flag it or update it before marking the work complete.

---

## Editing approach

**With all changes**:
- Prefer surgical edits over rewrites. When a file works and one thing is wrong, fix that one thing.
- Strongly scrutinize every assumption. When thinking for solutions, always recommend the solution that is best long-term or is the cleanest, and explain why.
- Lean on discussion and planning heavily. Aim to promote thorough discussion of advantages and disadvantages of an approach, especially when there are multiple.
- Don't speculatively refactor adjacent code. If it's worth doing, it's worth its own discussion.
- Absolutely never add mock, synthetic, placeholder, or example data in deliverable code. If a structure needs to exist before content does, stop for discussion and clarification.
- Prefer to stop and discuss **any** new dependency. The current set is deliberately small.

**Multi-file changes**:

For anything touching more than one component, a shared primitive, or the theme contract: state the plan before writing code and pause for confirmation. Don't leave the codebase with a new primitive API and stale call sites.

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
