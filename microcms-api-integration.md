## MicroCMS API Integration Checklist (this app)

Independent Nuxt SSG app on Vercel. Yugiri is a **reference only** — do not copy vhs-city subdir deploy, `/news/` routes, or `ssr: false`.

Live microCMS list items match the mock shapes in `app/data/talents.ts`, `app/data/topics.ts`, `app/data/units.ts`.

### Out of scope (do not implement)

- `patch-subdir-paths.mjs` — only needed when `NUXT_APP_BASE_URL` is not `/`. This app is at `/`.
- Draft preview (`draftKey`, `/news/preview/**`) — no preview UI; add later if needed.
- GA / `NUXT_PUBLIC_GTAG_ID` — not part of CMS wiring.
- `SITE_USER` / `SITE_PASSWORD` on Vercel SSG — Nitro basic-auth only runs on a Node server (`nuxt dev`). Static files on Vercel ignore it. Gate the trial with Vercel Deployment Protection if needed.
- Putting the API key in this file or in `NUXT_PUBLIC_*` unless the **browser** must call microCMS. This UI has no load-more; tag filter is in-memory. Keep the key **build/server-only**.

---

## How `dev` differs from production

| Command | Mode | Talks to microCMS | Browser gets |
|---|---|---|---|
| `npm run dev` | SSR | Every page request, live | Fresh HTML from local Node |
| `npm run generate` | SSG | Once, at generate | Files in `.output/public` |
| `npm run preview` after generate | Static | Only if leftover client fetches run | Same shape as production |
| Vercel | SSG | During `nuxt generate` only | CDN static files |

Leave SSR **on** for `dev`. Production is `nuxt generate`, not `nuxt build`.

- In `dev`, a CMS publish shows up on refresh. No webhook needed.
- In prod, a CMS publish does **not** appear until generate/deploy runs again. Use a Vercel deploy hook (or scheduled rebuild) after publish.
- `useAsyncData` / `await` in `<script setup>` is required so generate bakes data. `onMounted` + `fetch` does not produce SSG HTML. Keep `onMounted` for animation only.

---

## 1. Env vars

Use ignored `.env` for local `dev`/`generate`, `.env.staging` only for the staging command,
and Vercel project environment variables for deployment. Put secrets in local/Vercel env only — never in this doc.

| Variable | Role | Notes |
|---|---|---|
| `NUXT_PUBLIC_API_BASE_URL` | microCMS origin | `https://<service>.microcms.io` — **no** `/api/v1` |
| `NUXT_MICROCMS_API_KEY` | Read key (list + get) | `X-MICROCMS-API-KEY`. **Not** `NUXT_PUBLIC_*` |
| `NUXT_APP_BASE_URL` | App path | `/` for this trial |

Declare matching keys on `runtimeConfig` in `nuxt.config.ts` or Nuxt will not pick them up:

```ts
runtimeConfig: {
  microcmsApiKey: '', // NUXT_MICROCMS_API_KEY
  public: {
    apiBaseUrl: '',   // NUXT_PUBLIC_API_BASE_URL
  },
}
```

`app.config.ts` is **build-time** and is not overridden by `.env`.

- [ ] Align the existing stub (`server/utils/microcms.ts` uses a service domain) with origin + `/api/v1` in code.
- [ ] Set `brand.siteUrl` to `https://vivion-vebop-trial.vercel.app` (no trailing slash). Ignore leftover `brand.news.apiPrefix` (`/api/vebop`).
- [ ] Canonical / `og:url` use `brand.siteUrl` + path, not localhost.
- [ ] Rotate the read key if it was ever committed or pasted in docs.

---

## 2. API (microCMS REST)

Prefix in code: `/api/v1`. Header on every request: `X-MICROCMS-API-KEY`.

| Endpoint | Used for |
|---|---|
| `GET /api/v1/vebop-talents` | Home, `/talents/`, `/talents/:slug/` |
| `GET /api/v1/vebop-units` | `/talents/unit/`, `/talents/unit/:slug/`, talent filter |
| `GET /api/v1/vebop-topics` | Home, `/topics/`, `/topics/:id/` |
| `GET /api/v1/vebop-tags` | `/tag/:slug/`, category chips |
| `GET /api/v1/vebop-categories` | Only if shared-CMS filtering is required; UI currently hardcodes `#NEWS` |

Query rules:

- microCMS max `limit=100` — loop `offset` until `totalCount`.
- Request `depth` so `unit`, `members`, `tags`, `categories` are populated.
- Generate-time discovery needs `id` **and** `slug` (not `fields=id` only).
- Fetch full lists at generate (this archive is not paginated like Yugiri news `limit=12`).
- Route discovery in `nuxt.config` cannot use `useRuntimeConfig()` — read `process.env`.
- Fail **hard** if discovery fails during generate (missing files = 404 on Vercel).
- Skip discovery when not generating (`dev` should not list every ID on every start).

- [ ] Shared fetch helper used by generate + `dev` SSR.
- [ ] Composables (`useTalents`, `useTopics`) are the mapping layer. Stop importing `app/data/*` as the source of truth (mocks optional for local fallback only).

---

## 3. URLs and prerender

Internal links (trailing slash): `/topics/`, `/topics/${id}/`, `/talents/`, `/talents/${slug}/`, `/talents/unit/`, `/talents/unit/${slug}/`, `/tag/${slug}/`.

Today `getTopicBySlug` matches **topic `id`**, not a slug field.

- [ ] Add discovered CMS routes to `nitro.prerender.routes`. `crawlLinks` alone can miss unlinked items.
- [ ] Hook shape:

```ts
hooks: {
  async 'nitro:config'(nitroConfig) {
    const cmsRoutes = await generateCmsRoutes()
    if (cmsRoutes.length === 0) return
    nitroConfig.prerender ||= {}
    nitroConfig.prerender.routes ||= []
    nitroConfig.prerender.routes.push(...cmsRoutes)
  },
}
```

---

## 4. Rendering

SSG prerenders **each route**; that route’s `useAsyncData` fetches what it needs.

```
1. generateCmsRoutes()
     GET id + slug  →  prerender.routes +=
       /topics/:id/
       /talents/:slug/
       /talents/unit/:slug/
       /tag/:slug/

2. Nuxt prerenders each route
     /                 → talents + topics
     /topics/          → topics (+ tags)
     /topics/:id/      → topic detail
     /talents/         → talents + units
     /talents/:slug/   → talent detail
     /talents/unit/    → units
     /talents/unit/:slug/ → unit detail
     /tag/:slug/       → topics filtered by tag
     guideline / present-rules → no CMS

3. Each useAsyncData result is written into
     that page’s HTML + payload JSON
```

- [ ] CMS pages: `await useAsyncData(...)` in `<script setup>`.
- [ ] After `await`, set `useHead` / `useSeoMeta` in the same setup. Generate only sees sync head at prerender time.
- [ ] Do not put first paint of published content behind `onMounted`.

---

## 5. Images (after generate, optional)

microCMS bodies/thumbnails use `https://images.microcms-assets.io/...`.

- [ ] Copy `vivion/yugiri/scripts/localize-cms-images.mjs` into this app. Store under `.output/public/images/cms/` (not `news-cms/`). Adapt `NUXT_PUBLIC_PARENT_SITE_URL` to this app’s site origin.
- [ ] Do **not** run `patch-subdir-paths.mjs`.
- [ ] Order: `nuxt generate` → `localize-cms-images.mjs`.
- [ ] On download failure, leave the microCMS URL (do not break the page).
- [ ] `og:image` is either localized or an absolute URL we control.

```json
"generate": "nuxt generate && node --env-file-if-exists=.env ./scripts/localize-cms-images.mjs",
"generate:staging": "nuxt generate --dotenv .env.staging && node --env-file-if-exists=.env.staging ./scripts/localize-cms-images.mjs"
```

Vercel: build command as above; output `.output/public`; CMS env vars on the project for **build**.

---

## 6. Verify

### `dev` (SSR, live CMS)

- [ ] `npm run dev` — list and detail for talents, units, topics, tags hit microCMS.
- [ ] Publish in CMS, refresh `dev`, see the change.

### `generate` (SSG snapshot)

- [ ] `npm run generate` succeeds with CMS env set.
- [ ] `.output/public/topics/<id>/index.html`, `.output/public/talents/<slug>/index.html`, `.output/public/talents/unit/<slug>/index.html` exist for published items.
- [ ] That HTML contains title/body (view source), not an empty shell.
- [ ] If image script ran: `.output/public/images/cms/` has downloads; HTML no longer depends on those CMS image URLs.
- [ ] `npm run preview` — published URLs work with microCMS blocked.

---

## Quick list

1. `dev` = SSR + live API. Prod = SSG snapshot until the next generate/deploy.
2. Declare `runtimeConfig` keys; keep the API key off `NUXT_PUBLIC_*`.
3. `useAsyncData` for any page that must exist as a static file.
4. Enumerate CMS routes at generate time; do not rely on crawl alone.
5. Skip `patch-subdir-paths`. Optional: `localize-cms-images` after generate.
6. `brand.siteUrl` + `NUXT_APP_BASE_URL=/` match the Vercel origin.
7. Rebuild prod after CMS publish (Vercel deploy hook).
