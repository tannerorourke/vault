# Style Conventions

## Typography

Two font families in the system:

- **ui** (Roboto Flex) - every UI surface and every heading. Labels, eyebrows, navigation, buttons, captions, tags, pills, card titles, section titles, page titles, all structural copy. Accessed via two role-based tokens that both resolve to Roboto Flex today:
  - `theme.typography.fontFamily.display` - page-level titles and section titles
  - `theme.typography.fontFamily.sans` - all other UI text

  The two tokens are kept distinct so the heading face can diverge later without touching call sites.

- **serif** (Newsreader) - long-form reading content only, via `theme.typography.fontFamily.serif`. Section body prose, list-item content, project subtitle, finding card body. Anywhere the user is meant to *read*, not scan.

### Hierarchy rule

Serif says "this is the argument", display says "this is the topic", sans says "this is the interface". Index/scan surfaces (home page, card summaries) stay sans regardless of length.

Never reference raw `var(--font-*)` CSS variables in component CSS. Always use the theme token.

### Font variable + theme class must share an element

`next/font` declares `--font-display`, `--font-serif`, `--font-mono` via the classes it emits. The vanilla-extract theme class (which declares tokens like `--typography-fontFamily-serif: var(--font-serif)`) must live on the **same DOM element** as those `next/font` classes. CSS variables only inherit *down* - if the theme class sits on `html` while the `next/font` classes sit on `body`, the theme's `var(--font-serif)` substitution runs at `html` where `--font-serif` is undefined, the token becomes "invalid at computed-value time", and every component referencing it silently falls back to inherited body font. Both live on `<html>` in [layout.tsx](../../app/layout.tsx).

### Typography - usage patterns

| Surface | Family token |
| --- | --- |
| Page title (`h1`) | `display` |
| Section title (`h2`) | `display` |
| Card title (`h3`) | `display` |
| Standalone UI label, eyebrow, button, breadcrumb, nav, caption, tag, pill text | `sans` |
| Long-form body prose (section body, list items, project subtitle, finding body) | `serif` |
| Home tagline, About headline, card summaries | `sans` - scan surfaces, not read surfaces |

## Heading Hierarchy

Every page has exactly one `<h1>` describing what the page is. Sub-sections are `<h2>`. Nested content inside an `h2` section uses `<h3>`. Levels are never skipped (no `h1` → `h3`). Heading semantics reflect document structure, not visual size - size is controlled by theme tokens, not by element choice.

The site logo in `Header` is never an `h1` - it's repeated on every page and stays `<Text as="span">`. Each page owns its own `h1`.

### Per-page assignments

**Home (`/`):**
- `h1`: page tagline (`HEADING` from `content/home.ts`)
- `h2`: category labels ("Research", "Labs", "Experience")
- `h3`: project card titles (featured + regular)

**Project page (`/[pid]`):**
- `h1`: project title
- `h2`: section titles (`sectionTitle` in `Section/section.tsx`)
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

- **TextLink** - picks hover color via the `intent` prop (`action` → copper, `nav` → teal).
- **IconLink / IconButton** - copper hover baked in; these are always action-shaped.
- **LinkPill** - copper hover; used for hero CTAs and prominent actions.

### Acknowledged Exception

**ProjectCard title stays teal-on-teal.** The card is a composite hover surface - the whole card lights up as one target, not the title as a singular link. Treating the title as an independent copper link would split the hover affordance and read as two separate controls. Teal-on-teal keeps the card unified.

### Link hover - usage patterns

| Surface | Primitive | `intent` | Notes |
| --- | --- | --- | --- |
| Header back/forward | `TextLink` | `navigation` | `leftIcon` = directional arrow (arrow-left / arrow-right) encoding transition direction |
| Breadcrumb | `TextLink` | `navigation` | no icon |
| TOC item | `TocLink` (composes `TextLink`) | `navigation` | hover behaviour hardcoded internally |
| Finding anchor jump | `TextLink` | `navigation` | `rightIcon` = arrow-down |
| External contact link in prose (About, Footer) | `TextLink` | `interactive` | `leftIcon` = brand glyph (`tone="muted"`), `rightIcon` = arrow-up-right |
| Hero action pill (github, paper, etc.) | `LinkPill` | n/a - always interactive | icon at `md` |
| Card icon row (brand glyph, no label) | `IconLink variant="flat"` | n/a - always interactive | icon at `md`, `tone="muted"` |
| Header menu trigger | `IconButton variant="pill"` | n/a - always interactive | icon at `lg` |
| Bespoke composite surface (ProjectCard whole card) | not a link primitive | exempt | card-level hover, not link-level; see acknowledged exception above |

## Icons

### Size scale (frozen)

`sm=14`, `md=16`, `lg=20`. Reserved: `xl=24`.

- **sm** - decorative/secondary glyphs (menu arrows, inline accents)
- **md** - standard in-context icons (card icon rows, pill actions, body-inline)
- **lg** - primary affordance icons (TextLink side-slot, IconButton pill, menu row primary icon)

### Sizing mechanism

Only via the `<Icon>` wrapper component. Raw SVGs from `components/icons/` are not rendered directly - they're rendered through `<Icon name="..." size="..." />`.

### Color

Icons inherit `currentColor` from their container. Hover transitions go on the container, not on an icon wrapper. To dim an icon below its surrounding text, use `tone="muted"` on `Icon` (not arbitrary CSS).

### Icon - usage patterns

**Visual style**: **outlined by default; duotone only where the fill carries
semantic weight**. The rule:

- **Outlined** for functional and navigational glyphs (arrows, carets, network, times, notebook, grad-cap, and similar). The icon is a label, not an image; visual weight comes from stroke alone.
- **Duotone** only where the filled region is the metaphor or content of the icon - moon (dark face), sun (body), envelope (the enclosed letter). Reserved for icons whose meaning is materially weakened by removing the fill. Adding a new duotone icon is an explicit, considered choice; the default for a new icon is outlined.
- **Brand glyphs** (github, linkedin, medium) are exempt - they render as their canonical solid-fill logos. Third-party identity overrides house style.

Duotone fill renders at `opacity={0.5}` on the filled SVG layer. This is set
on the SVG itself, not via a runtime prop - see step 3.

#### Three icon-bearing button forms

Three and only three icon-button forms exist on the site. No fourth form is introduced without written justification that none of these three works.

| Form | Container | When | Example |
| --- | --- | --- | --- |
| `LinkPill` | Tall rounded pill, text + icon, divider border | Primary action with a label - a button that does or opens something | Hero "github" / "paper" |
| `IconLink` (flat) | Bare icon, ~28×28 hit-target, no visible chrome until hover | Quiet decoration on a surface that is itself the primary affordance | ProjectCard icon row |
| `IconButton` (pill) | 40×40 round, card bg, drop shadow | Primary standalone CTA in a sparse area | Header menu trigger |

Three contexts the forms encode: text-bearing primary action, quiet decoration on a larger surface, standalone heavy CTA. If a new surface doesn't match one of these contexts, the surface probably doesn't need its own form - it needs to fit one of the existing three.

**Shared visual language.** The three forms differ only where context genuinely demands it. They share:

- The same hover scheme: bg → `tint.secondary`, border (where present) → `tint.secondarySoft`, color → `secondary.main` (copper interactive convention)
- The same focus-visible treatment: 2px outline at 2px offset
- The same border-radius scale: small radius for short forms (flat), full pill for tall forms (`LinkPill`, `IconButton`)

The only legitimate axis of variation is shadow vs. no-shadow, and it tracks "primary standalone CTA" (`IconButton` pill: shadowed) vs. everything else (`LinkPill` and flat: no shadow). A different hover color, focus style, or radius means the form probably shouldn't exist.

#### Icons inside other primitives

Icons also appear as slots inside primitives that aren't icon-buttons. The icon is decoration inside a different component - these are not forms.

| Slot | Where | Treatment |
| --- | --- | --- |
| `TextLink` left/right slot | Header back/forward, About contact rows, Finding anchor jump | Icon inherits the TextLink's hover; no independent container |
| ConnectMenu row primary icon | Each menu item | Icon inherits the row's hover color |
| Trailing / inline secondary glyph | Menu-item trailing arrow, inline accents | Decorative; follows surrounding text color |

#### Size by container or slot

Size is derived from the form or slot, never chosen at the call site.

| Container / slot | Icon size |
| --- | --- |
| `LinkPill` | `md` (16 px) |
| `IconLink` (flat) | `md` (16 px) |
| `IconButton` (pill) | `lg` (20 px) |
| `TextLink` left/right slot | `lg` (20 px) |
| ConnectMenu row primary icon | `lg` (20 px) |
| Trailing / inline secondary glyph | `sm` (14 px) |

#### Tone

`tone="muted"` (opacity 0.7) is applied when the icon is decoration on a surface that is itself the primary affordance:

- ProjectCard icon row - the card is the link; icons are quiet identification
- About contact-row left icon - the text label is the primary affordance; the brand glyph is secondary

`tone` stays `default` when the icon is the primary affordance of its row (IconButton trigger) or is a directional glyph (arrows, carets - these should be crisp).

## Typography on Containers vs. Primitives

Setting typography on a *container* (`fontSize`, `fontFamily`, `fontWeight`, `letterSpacing`, `color`) does **not** reach text that's rendered through a `Text`-based primitive (`Text`, `TextLink`, `Eyebrow`, `TagChip`, `LinkPill`, ...). The primitive applies an explicit `textRecipe` class to its inner element, and an explicit declaration on a child always wins over an inherited value from an ancestor. This is normal CSS inheritance — but it surprises when you expect a wrapper to "style what's inside".

### Worked example

```ts
// project-page.css.ts
export const crumbs = style({
  fontSize: theme.typography.fontSize.eyebrow,   // applied to <nav>
  fontWeight: theme.typography.fontWeight.semibold,
  textTransform: "uppercase",
});
```

```tsx
// project-page.tsx
<nav className={sty.crumbs}>
  <TextLink intent="navigation" label="Work" nextProps={{ href: "/" }} />
  ...
</nav>
```

The rendered DOM looks roughly like:

```html
<nav class="crumbs">          ← font-size: eyebrow (own)
  <a class="linkBtnBase ...">  ← font-size: eyebrow (inherited — <a> declares none)
    <p class="textRecipe-body ..."> ← font-size: body (own — wins over inherited)
      Work
    </p>
  </a>
</nav>
```

`textTransform: uppercase` and `fontWeight: semibold` *do* propagate to the `<p>` (those properties inherit, and the recipe doesn't redeclare them). `fontSize` does not, because the `body` variant declares it on the `<p>` itself.

### Rules

1. **If you find yourself setting typography on a container that wraps a primitive, stop.** The styles will land on the container but not on the rendered text. Either:
   - pick the correct primitive variant (`<Eyebrow>`, `<Text variant="eyebrow">`, etc.), or
   - pass `textProps={{ variant: "..." }}` to the primitive (TextLink supports this), or
   - render bare markup (`<a>`, `<p>`, `<span>`) if you genuinely want container-driven inheritance.
2. **The moment you reach for `Text` / `TextLink` / `Eyebrow`, you opt into that primitive's typography contract.** Container-level overrides will silently no-op for any property the recipe declares (`fontSize`, `lineHeight`, `fontWeight` on most variants, `color` on `caption`/`micro`).
3. **Inheritable properties the recipes don't redeclare *will* propagate** (`textTransform`, `letterSpacing` on some variants, etc.). Don't rely on this — if a wrapper needs to dictate type, do it through the primitive's API, not by setting CSS that happens to inherit.

### Why this isn't a bundle-order issue

vanilla-extract bundles a file's CSS *before* the CSS of files that import it. In this codebase `typography.css.ts` is imported (transitively) by `project-page.tsx`, so the `textRecipe` rules appear in the stylesheet *before* `project-page.css.ts`. If the two classes ever landed on the same element, `sty.crumbs` would win on source order. They don't — `crumbs` is on `<nav>`, `textRecipe-body` is on `<p>` — so the contest is purely inheritance vs. explicit child declaration, and the explicit child wins every time.
