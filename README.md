# Adv. Karandeep (KD) — Website (Next.js)

This is the Next.js rewrite of the original static HTML site. It keeps the same design and content, but fixes the
two issues flagged during review, and adds the technical SEO groundwork needed before launch.

## A note on dependencies

This project is on **Next.js 15.5.24** (the "Maintenance LTS" line) and **React 19** — not Next.js 14, which reached
end-of-life in October 2025 and stopped receiving security patches entirely (several critical vulnerabilities
disclosed in late 2025/2026 were never backported to it). Next.js now ships security patches on a monthly schedule.
Before you deploy, and every so often afterward, run:

```bash
npm outdated next
npm audit
```

and update `next` in `package.json` if a newer patched version exists — this is genuinely important for a
production site, not routine busywork. If you push this to GitHub, turning on Dependabot (Settings → Security →
Dependabot) will open a pull request for you automatically whenever Next.js publishes a security fix.

## What changed vs. the original static site

- **Contact form now actually sends email.** It posts to `/api/contact`, which sends via [Resend](https://resend.com)
  (3,000 emails/month free). The old version just showed a fake "Thank you" message and discarded the data.
- **The admin login/dashboard is gone.** It used a hardcoded password (`admin` / `kd@admin2026`) checked against
  `localStorage`, which is not real security — anyone could read or bypass it from the browser console. **Blog
  publishing now runs on [Sanity](https://sanity.io)** — a real, free CMS with proper login, embedded right into this
  site at `/studio`. The advocate can write and publish a post from a phone browser, no code or redeploy needed. See
  "Setting up the blog (Sanity)" below.
- **Real SEO metadata per page**, `sitemap.xml` and `robots.txt` generated automatically, a generated favicon and
  Open Graph share image, and JSON-LD structured data (`Attorney` on every page, `Article` on each blog post).
- **Privacy Policy rewritten** to accurately describe the real data flow (Resend for the contact form, Sanity for
  the blog, no admin panel, no analytics) instead of a generic policy that didn't match what the site actually does.

## Before you do anything else

Two things still need the advocate's sign-off before this goes live — not fixed by this rewrite, because they're
judgment calls, not code:

1. **Bar Council of India Rule 36 compliance.** Phrases like "Book Consultation", "500+ Cases Handled", "98% Client
   Satisfaction" read as advertising/solicitation, which the BCI restricts for advocates. Have the wording reviewed
   before launch.
2. **Enrolment number.** The About page timeline still has a placeholder (`Reg. No. [XXXX]`) — search `lib` and
   `app/about/page.tsx` if you added the real one elsewhere, or add it before shipping.

## Local development

```bash
npm install
cp .env.example .env.local   # then fill in RESEND_API_KEY and the Sanity values (see below)
npm run dev
```

Open http://localhost:3000.

## Setting up the contact form (Resend)

1. Create a free account at https://resend.com.
2. Grab an API key and put it in `.env.local` (and later in your hosting provider's environment variables) as
   `RESEND_API_KEY`.
3. Until you verify your own domain with Resend, emails must be sent *from* `onboarding@resend.dev` — this is
   already the default in `.env.example`. Once you verify `advocatekd.com` (or whatever domain you buy) with
   Resend, change `CONTACT_FROM_EMAIL` to something like `contact@advocatekd.com`.
4. `CONTACT_TO_EMAIL` is where enquiries land — defaults to the advocate's current Gmail address.

Without `RESEND_API_KEY` set, the form will correctly show an error asking the visitor to call/WhatsApp instead,
rather than silently failing or lying about success.

## Setting up the blog (Sanity)

The blog now runs on Sanity, a free headless CMS. There's no local database — content lives in Sanity's cloud, and
this Next.js site reads it and renders it.

### 1. Create the Sanity project

1. Go to https://www.sanity.io/manage and sign up (free — GitHub/Google login works fine).
2. Create a new project. Any name is fine (e.g. "KD Law Website"). Choose the default dataset name, `production`.
3. On the project's overview page, copy the **Project ID**.
4. Add both values to `.env.local` (and later to your hosting provider's environment variables):
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

### 2. Allow this site to talk to Sanity (CORS)

Still in manage.sanity.io: **API → CORS Origins → Add CORS origin**, and add:
- `http://localhost:3000` (check "Allow credentials") — for local development
- `https://yourdomain.com` (check "Allow credentials") — once you have a real domain deployed

Without this step, `/studio` will fail to load with a CORS error in the browser console.

### 3. Log in and publish

```bash
npm run dev
```

Visit **http://localhost:3000/studio**. The first person to log in (via Google/GitHub/email — Sanity's own auth,
not this website's) becomes the project's admin. Click "Blog Post" → "Create new" to write and publish an article.
Once deployed, the advocate does this at `https://yourdomain.com/studio` — including from a phone.

### 4. (Optional) Import the original 6 articles

The articles that were in the old static site are preserved in `scripts/legacy-blog-seed-data.ts`. To import them
into Sanity instead of retyping them:

1. Create a write token: manage.sanity.io → your project → **API → Tokens → Add API token**, role **Editor**.
2. Add it to `.env.local` as `SANITY_API_WRITE_TOKEN` (local use only — never add this token to your hosting
   provider's environment variables; the live site never needs write access).
3. Run:
   ```bash
   npm run seed
   ```
4. Check `/studio` — the 6 articles should now appear, already published.

### 5. Instant publish updates (webhook)

Without this step, a new post can take up to a minute to appear live (Next.js's own cache). To make publishing
instant:

1. Generate a secret: `openssl rand -base64 32` (or any long random string).
2. Add it as `SANITY_REVALIDATE_SECRET` in `.env.local` and in your hosting provider's environment variables.
3. In manage.sanity.io → your project → **API → Webhooks → Create webhook**:
   - **URL:** `https://yourdomain.com/api/revalidate`
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** `_type == "post"`
   - **Projection:** `{"_type": _type, "slug": slug}`
   - **Secret:** the same value as `SANITY_REVALIDATE_SECRET`
4. Save. Publishing a post in Studio now updates the live site within seconds.

### A note on `npm audit` and Sanity

`npm audit` will show some high/critical findings after installing — these are all inside `@sanity/cli`, a tool
Sanity's own package pulls in for commands like `sanity init` (downloading starter templates) that **this project
never runs** (the Studio here is embedded and configured directly in code). They don't affect the deployed site or
anyone visiting it. Worth being aware of, not worth losing sleep over.

## Deploying

This is a completely static-friendly Next.js app plus one small API route, so any of these work well:

- **Vercel** (easiest, made by the Next.js team): push this folder to a GitHub repo, import it at vercel.com, add
  the environment variables from `.env.example` in the project settings, deploy.
- **Netlify**: same flow via the Next.js Runtime plugin (installed automatically when it detects a Next.js repo).
- **Cloudflare Pages**: supported via the `@cloudflare/next-on-pages` adapter — a bit more setup since this app uses
  an API route; Vercel or Netlify will be less friction for the contact form to work out of the box.

Steps common to all of them:

1. Push this project to a **private GitHub repository** (this also gives you version history and a backup — see the
   original launch checklist for why that matters).
2. Connect the repo in your chosen host's dashboard.
3. Add the environment variables from `.env.example`.
4. Deploy. HTTPS, CDN, and the build are handled automatically.
5. Once you buy a domain, connect it in the same dashboard and update `url` in `lib/site-config.ts` to match (this
   feeds the sitemap, canonical URLs, and Open Graph tags).

## After deploying — SEO checklist

- Submit `https://yourdomain.com/sitemap.xml` in [Google Search Console](https://search.google.com/search-console).
- Set up a [Google Business Profile](https://www.google.com/business/) (free) — subject to the same BCI compliance
  review as the website copy.
- Run the live site through [PageSpeed Insights](https://pagespeed.web.dev/) once deployed.

## Project structure

```
app/                  Pages (App Router) + API routes + sitemap/robots/icon generators
  studio/[[...tool]]  Embedded Sanity Studio — the advocate publishes here
  api/contact/        Contact form → Resend
  api/revalidate/     Sanity webhook → instant cache refresh on publish
components/           Reusable UI (Navbar, Footer, ContactForm, BlogGrid, etc.)
lib/                  Site config, practice area data, Sanity client/queries
  blog-data.ts        Server-only: fetches posts from Sanity
  blog-types.ts        Client-safe: shared BlogPost type + category helper
  sanity/             Sanity client, GROQ queries, image URL builder, API config
sanity/schemaTypes/   The "Blog Post" content model shown in Studio
scripts/              One-time Sanity import script + the original 6 articles as data
public/images/        Advocate photo
```
