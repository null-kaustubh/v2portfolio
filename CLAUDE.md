# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server, Turbopack, http://localhost:3000
npm run build    # production build (Turbopack)
npm run start    # serve the production build
npm run prd      # build + start
npm run lint     # eslint (next/core-web-vitals + next/typescript)
```

No test suite exists. Type-checking happens via `npm run build` (or `npx tsc --noEmit`).

## Stack

Next.js 16 App Router + React 19, TypeScript strict, Tailwind CSS v4 (CSS-first — no `tailwind.config`, all tokens live in `app/globals.css`), shadcn/ui (new-york, `components.json`), Motion, Upstash Redis, deployed on Vercel.

Path alias: `@/*` maps to the repo root (not `src/`). `src/` only holds `src/registry/flip-sentences`.

## Architecture

### Feature-folder layout

Business code lives in `features/`, not `components/`. `components/` holds only shared/shadcn primitives. Each feature folder follows `components/ | data/ | types/`:

- `features/portfolio/*` — sections of the home page (hero, overview, socials, career-path, techstack, open-source, projects, blogs, profile). Each usually exports a section component plus a matching `*Skeleton`.
- `features/project/`, `features/blog/` — the full detail-page renderers, MDX content, and MDX loaders.
- `features/panel.tsx` — the `Panel` / `PanelHeader` / `PanelTitle` / `PanelContent` primitives every portfolio section is built from.
- `features/topbar/`, `features/footer/`.

### Page composition

`app/(app)/page.tsx` is the home page. Every section below the fold is `next/dynamic`-imported with a skeleton `loading` fallback, and each is wrapped in `ContentWrapper` — a component **exported from `app/(app)/page.tsx` itself** and imported by `app/projects/**` and `app/blogs/**`. It draws the vertical edge borders and the four corner diamonds. Keep it there; other pages depend on that import path.

The bordered-grid look comes from custom Tailwind v4 `@utility` rules in `app/globals.css`: `screen-line-before` / `screen-line-after` (and `-elevated` variants) draw 200vw hairlines that bleed past the container. Use those rather than plain borders when adding sections.

### Content pipeline (MDX)

Projects and blogs are file-based MDX read at build time from the filesystem:

- `features/project/content/*.mdx` → `features/project/data/projects.ts`
- `features/blog/content/*.mdx` → `features/blog/data/blogs.ts`

Both loaders use `gray-matter` for frontmatter, derive the slug from the filename, and wrap the reader in React `cache()`. Frontmatter shape is typed in `features/*/types/*.ts` — projects require `title, description, image, tech[], status, createdAt, updatedAt, githubUrl, liveUrl` (`productHunt` optional); blogs use `title, description, image, createdAt, updatedAt, pinned?`.

Adding a project or blog post = dropping an `.mdx` file in the content dir. Sorting is by `createdAt` desc, with `pinned` blogs first.

**Important:** `getProjectBySlug` **replaces** the local MDX body with the repo's GitHub `README.md` whenever that fetch succeeds (`fetchGithubReadme`, tries `main` then `master`, `revalidate: 3600`). The MDX body is only a fallback — editing `features/project/content/*.mdx` prose has no visible effect for repos with a README. Frontmatter is always used. Repo stats (stars/forks/issues/watchers) come from the GitHub REST API in the same call.

Rendering goes through `next-mdx-remote/rsc` with `@shikijs/rehype` dual themes (`one-light` / `one-dark-pro`, `defaultColor: false`); `features/blog/components/blogComponents.tsx` supplies the MDX component overrides and is shared by both project and blog pages.

Project detail pages are `export const dynamic = "force-static"` with `generateStaticParams`.

### Images

Content images are **not** served from `public/`. `resolveImage()` in `lib/constants.ts` prefixes any non-`http` path with `https://assets.1xkaustubh.com` (the `ASSETS_REPO` CDN), which is also the allowed `remotePatterns` host in `next.config.ts`. So frontmatter `image: "/images/foo.png"` means `assets.1xkaustubh.com/images/foo.png`. Always pass content image paths through `resolveImage` before `next/image`.

### Theming

No `next-themes`. Theme is a `color-theme` cookie read server-side in `app/layout.tsx`, applied as both a class and `data-color-theme` on `<html>` (default `dark`, avoiding a flash), then toggled client-side by `context/ThemeProvider.tsx` via `js-cookie` + direct DOM mutation. CSS variables are keyed off `[data-color-theme="dark"]`, so new theme-aware CSS must use that selector, not `.dark` alone.

Fonts are local (`assets/fonts/fonts.ts`): SF Pro Display (body), Departure Mono and Fragment Mono, exposed as CSS variables.

### View counter

`app/api/views/route.ts` increments a `portfolio-views` key in Upstash Redis, gated by a 24h `visited` cookie; `hooks/views.tsx` fetches it client-side. Requires `KV_REST_API_URL` and `KV_REST_API_TOKEN` (Vercel KV env vars, in `.env.local`). The route swallows Redis errors and returns `{ views: 0 }`.

### SEO

`app/sitemap.ts`, `app/robots.ts`, and `app/llms.txt/route.ts` are all generated from the same MDX loaders as the pages, so new content appears in them automatically — never hand-maintain a static `public/sitemap.xml` or `public/robots.txt` (a static file in `public/` would silently win over these routes).

Next.js **replaces** rather than merges `openGraph` and `twitter` when a page defines its own. Any page that sets `openGraph` must therefore repeat `siteName`, `locale`, and `images`, or those tags vanish from that page. `robots`, `icons`, and `manifest` from the root layout do inherit.

`SOCIAL_PROFILES` in `config/site.ts` feeds schema.org `sameAs` on the home page; it duplicates the URLs in `features/portfolio/socials/links.tsx` (which can't be imported from metadata code because it carries JSX icons). Update both.

### Site config

`config/site.ts` is the single source for site URL, GitHub username/repo, and UTM params; `features/portfolio/profile/data/user.ts` (`USER`) is the source for name, bio, keywords, OG image, and job title. Metadata, JSON-LD (`schema-dts`), and OG tags on every page derive from those two — change them there, not in individual pages.

`lib/githubContributions.ts` hardcodes the GitHub username and a `created:>=2026-01-01` filter for the open-source PR list.
