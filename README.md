# Rayonix website

Next.js (App Router) site deployed to Cloudflare Pages with `@cloudflare/next-on-pages`.

## Develop

```sh
pnpm install
pnpm dev                # http://localhost:3000
pnpm build              # next-on-pages build into .vercel/output/static
pnpm preview            # build, then wrangler pages dev (runs the edge API routes)
pnpm check:links        # crawl the built HTML for broken links, anchors and a11y basics (after a build)
```

## Content

Page copy lives in typed modules under `src/content/` so it can change without touching layout:

| File | What it holds |
| --- | --- |
| `site.ts` | Contact details, offices, contact subjects, feature flags (single source for emails, phone, addresses, LinkedIn) |
| `about.ts`, `contact.ts`, `careers.ts` | Company pages |
| `capabilities.ts` | The seven capability areas and their links |
| `ecosystem.ts` | X Labs, neXr Optronics, Mcray Xtend |
| `news.ts` | Newsroom stories and media coverage |
| `navigation.ts`, `footer.ts` | Company menu and footer columns |

Values still waiting on the client are marked `TODO_CONTENT`.

## Environment variables (Cloudflare Pages → Settings → Variables)

| Variable | Used by | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `/api/contact`, `/api/newsletter` | Without it, enquiries are written to the function logs instead of emailed. |
| `CONTACT_TO` | `/api/contact` | Recipient for enquiries. Default `info@rayonix.in`. |
| `CONTACT_FROM` | `/api/contact` | Sender address (must be a domain verified in Resend). Default `website@rayonix.in`. |
| `NEWSLETTER_TO`, `NEWSLETTER_FROM` | `/api/newsletter` | As above, for newsletter sign-ups. |
| `TURNSTILE_SECRET_KEY` | `/api/contact` | Cloudflare Turnstile secret. When unset, verification is skipped (local dev). |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Contact form | Turnstile site key. Build-time variable: set it before building. When unset, the widget is not shown. |

Never commit secrets. For local `wrangler pages dev`, put them in `.dev.vars` (git-ignored).
