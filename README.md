# Portfolio

My personal portfolio + research site - a showcase of work and a hub for code, papers, and articles. Built with [Next.js 16](https://nextjs.org) (App Router, React 19) and Vanilla Extract (SSR styling). Deployed on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

## Architecture

- **Styling** — All styles flow through a Vanilla Extract theme contract (`src/lib/theme`); no inline styles or raw hex.
- **Content** — Page and project content lives as strictly-typed data in `src/content` and `src/lib/content`, rendered through shared UI primitives.
- **Conventions** — Component, typography, and link/icon rules are documented in `docs/CONVENTIONS.md`.

## Routing & Transitions

Page transitions use the browser's native **View Transitions API**, wired in via [`next-view-transitions`](https://github.com/shuding/next-view-transitions) (`<ViewTransitions>` in the root layout). 

`ContentTransitionProvider` adds directional motion on top:
- Derives a direction (`left`/`right`/`up`/`down`/`none`) from the route kind (home, about, etc.) and navigation type (push vs. browser back/forward, read off the Navigation API) and writes it to `<html data-page-transition>`. 
- Directional slide keyframes are attached to the `::view-transition-*(page-content)` pseudo-elements in CSS, so only the routed content animates while the shell (header, canvas) gets the default crossfade. 
- The provider also handles scroll reset and hash-anchor restoration on the nested scroll container
- Collapses to instant motion under `prefers-reduced-motion`.

## Content

Custom `<Markdown>` primitive (built on [`react-markdown`](https://github.com/remarkjs/react-markdown)) renders configured content in `src/content` with rich formatting:
- Links route through `next-view-transitions` for internal paths, stay native `<a>` for `#` anchors (no view transition), and open in a new tab when external.
- Inline `**bold**`, `*em*`, and `` `code` ``, plus inline/block math (`$…$` / `$$…$$`) rendered with KaTeX (`remark-math` + `rehype-katex`).
- Fenced code blocks are syntax-highlighted server-side and passed through as raw HTML (`rehype-raw`).
- Output flows through the shared `Text` primitive; an `inline` mode drops the paragraph wrapper, and `as` / `textProps` target the rendered element.

Icons are configured locally in `src/components/icons`, pulled from Iconify:
- Core icons: [Phosphor Icons](https://icon-sets.iconify.design/ph/)
- Brands icons: [Boxicon Brands](https://icon-sets.iconify.design/bxl/)

## Access

Keeping this public until a reason to make it private comes up. Feel free to fork, but hit me up to chat first!

Runs with boilerplate npm scripts

```bash
npm run dev
npm run build
npm run lint
```
