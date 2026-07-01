# My 'Vault'

Personal site, for sharing code, papers, and articles. Built with [Next.js 16](https://nextjs.org) (App Router, React 19) and [Vanilla Extract](https://vanilla-extract.style/) (SSR styling).

## Features

- **100% SSR Styles**: Thanks to Vanilla Extract, this includes a theme contract
- **Custom `react-markdown` extension**: Supports inline/block math, lists, images, internal/external links, KaTeX (`remark-math` + `rehype-katex`), and server-side rendered code block syntax highlighting (`rehype-raw`).
- **Simple project configuration**: `json` configured pages (`src/lib/content`) with ability to link body section directly to markdown file, so I can focus on my work!
- **Directional motion page navigation**: Built on top of [`next-view-transitions`](https://github.com/shuding/next-view-transitions) and the browser's native **View Transitions API**. Derives animation direction (`left`/`right`/`up`/`down`/`none`) from the route and navigation type (push vs. browser back/forward), handles scroll, hash-anchors, and collapses to instant motion under `prefers-reduced-motion`.


---

Icons are pulled from Iconify and configured locally in `src/components/icons`:
- Core icons: [Phosphor Icons](https://icon-sets.iconify.design/ph/)
- Brands icons: [Boxicon Brands](https://icon-sets.iconify.design/bxl/)

## Access

Keeping this public unless a reason to make it private comes up. Feel free to fork, but contact up to chat first!

Runs with boilerplate npm scripts

```bash
npm run dev
npm run build
npm run lint
```
