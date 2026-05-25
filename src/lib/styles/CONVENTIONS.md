# Style Conventions

## Typography

Two font families in the system:

- **ui** (Roboto Flex) — every UI surface and every heading. Labels, eyebrows, navigation, buttons, captions, tags, pills, card titles, section titles, page titles, all structural copy. Accessed via two role-based tokens that both resolve to Roboto Flex today:
  - `theme.typography.fontFamily.display` — page-level titles and section titles
  - `theme.typography.fontFamily.sans` — all other UI text

  The two tokens are kept distinct so the heading face can diverge later without touching call sites.

- **serif** (Newsreader) — long-form reading content only, via `theme.typography.fontFamily.serif`. Section body prose, list-item content, project subtitle, finding card body. Anywhere the user is meant to *read*, not scan.

### Hierarchy rule

Serif says "this is the argument", display says "this is the topic", sans says "this is the interface". Index/scan surfaces (home page, card summaries) stay sans regardless of length.

Never reference raw `var(--font-*)` CSS variables in component CSS. Always use the theme token.

### Font variable + theme class must share an element

`next/font` declares `--font-display`, `--font-serif`, `--font-mono` via the classes it emits. The vanilla-extract theme class (which declares tokens like `--typography-fontFamily-serif: var(--font-serif)`) must live on the **same DOM element** as those `next/font` classes. CSS variables only inherit *down* — if the theme class sits on `html` while the `next/font` classes sit on `body`, the theme's `var(--font-serif)` substitution runs at `html` where `--font-serif` is undefined, the token becomes "invalid at computed-value time", and every component referencing it silently falls back to inherited body font. Both live on `<html>` in [layout.tsx](../../app/layout.tsx).

## Heading Hierarchy

Every page has exactly one `<h1>` describing what the page is. Sub-sections are `<h2>`. Nested content inside an `h2` section uses `<h3>`. Levels are never skipped (no `h1` → `h3`). Heading semantics reflect document structure, not visual size — size is controlled by theme tokens, not by element choice.

The site logo in `Header` is never an `h1` — it's repeated on every page and stays `<Text as="span">`. Each page owns its own `h1`.

### Per-page assignments

**Home (`/`):**
- `h1`: page tagline (`HEADING` from `content/home.ts`)
- `h2`: category labels ("Research", "Labs", "Experience")
- `h3`: project card titles (featured + regular)

**Project page (`/[pid]`):**
- `h1`: project title
- `h2`: section titles (`sectionTitle` in `Section/sections.tsx`)
- `h2`: next-project title (`NextProjectFooter`)

**About (`/about`):**
- `h1`: headline paragraph (`PARAGRAPHS[0]`)
- `h2`: "Get in touch" contact-section label

**Not-found:** `h1`: "Page not found"

## Link & Icon Hover Colors

Hover color signals **what kind of action** a link performs.

| Hover color | Token | Meaning | Used for |
| --- | --- | --- | --- |
| Copper | `link.hover` / `secondary.main` | "Do something" | Interactive content: CTAs, action icons, hero pills |
| Teal | `primary.main` | "Go somewhere on this page" | In-page navigation: breadcrumbs, TOC, anchor jumps |

### Rationale

Copper marks links that act on or leave the current context (open a project, follow an external link, trigger an action). Teal marks links that move the reader *within* the current page or surface (jump to a section, step back up a breadcrumb trail). Keeping these distinct lets the user predict outcome from color alone.

### Primitives Governed

- **TextLink** — picks hover color via the `intent` prop (`action` → copper, `nav` → teal).
- **IconLink / IconButton** — copper hover baked in; these are always action-shaped.
- **LinkPill** — copper hover; used for hero CTAs and prominent actions.

### Acknowledged Exception

**ProjectCard title stays teal-on-teal.** The card is a composite hover surface — the whole card lights up as one target, not the title as a singular link. Treating the title as an independent copper link would split the hover affordance and read as two separate controls. Teal-on-teal keeps the card unified.

## Icons

### Size scale (frozen)

`sm=14`, `md=16`, `lg=20`. Reserved: `xl=24`.

- **sm** — decorative/secondary glyphs (menu arrows, inline accents)
- **md** — standard in-context icons (card icon rows, pill actions, body-inline)
- **lg** — primary affordance icons (TextLink side-slot, IconButton pill, menu row primary icon)

### Sizing mechanism

Only via the `<Icon>` wrapper component. Raw SVGs from `components/icons/` are not rendered directly — they're rendered through `<Icon name="..." size="..." />`.

### Color

Icons inherit `currentColor` from their container. Hover transitions go on the container, not on an icon wrapper. To dim an icon below its surrounding text, use `tone="muted"` on `Icon` (not arbitrary CSS).
