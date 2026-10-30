# Blog editing

Posts live in `content/blog/<slug>.json`, one file per post. You normally never
touch these by hand: use the editor at **https://oviwellness.com/admin/**, or import a
Google Doc (below).

## Signing in to the editor (once per browser)

1. On GitHub create a **fine-grained personal access token**
   (Settings > Developer settings > Personal access tokens > Fine-grained tokens).
   Repository: `EricFidalgo/optimal_vitality`. Permission: **Contents: Read and write**.
2. Open `/admin/`, choose **Sign In with Token**, paste the token.
   The token is stored in that browser only. You need write access to the repo.

## Importing a Google Doc (no copy and paste)

1. In the Doc: **File > Download > Markdown (.md)**.
2. In the project folder (first time only: `npm ci`):

   ```
   node scripts/import-post.js path/to/doc.md --category "Hormone Optimization"
   ```

   Options: `--slug`, `--date YYYY-MM-DD`, `--publish`, `--force`. Without `--publish` the
   post is a **draft**.
3. The script prints what it changed and what still needs a person. It:
   - uses the first `#` heading (Title / Heading 1) as the title,
   - starts a new section at each `##` heading (Heading 2); text before the first one is the opening section,
   - turns "Sources:" and "Disclaimer:" paragraphs into their own sections,
   - removes the Google table of contents, `[END ARTICLE]` and anything after it, `[button ...]`
     placeholders, editor notes in brackets, embedded images, and tracking parameters on links,
   - fixes tables and rewrites old `article?id=...` links to the new post addresses.
4. Open the post in `/admin/` and add what the Doc doesn't carry: featured image and
   description, SEO title and meta description, the Spanish version. Check the summary (it is
   taken from the first paragraph). Then switch **Published** on and save.

Tips for the Doc: use Heading 1 for the title and Heading 2 for each section, and Heading 3
for questions inside a section. Don't format whole sentences as headings.

## Writing a post in the editor

- **Published** off = draft. Nothing appears on the site until it is on.
- **Title** also becomes the web address (`/blog/<slug>`) when the post is first created.
  Changing the title later does not change the address.
- **Sections:** the first section is the opening text and its heading is not shown. Section text
  supports bold, links, bullet and numbered lists, tables and sub-headings (Markdown). Pasting
  from Google Docs keeps most formatting.
- **Images:** the **Featured image** shows at the top of the post, on the blog page card and
  in social shares. Each section can also have an image, shown above that section's heading.
  Always fill in the image description (alt text). Resize and compress images first
  (about 1200 px wide, under 200 KB). Spanish uses the same images; only the descriptions
  are translated.
- **Related service:** pick the service page the post belongs to. The post then shows a "Related service"
  card linking to it (before any Disclaimer or Sources section), and that service page lists the newest
  two posts for it under "Related articles". Leave it empty for general posts. A service with no tagged
  post (today IV & Wellness and Sexual Wellness) simply shows no "Related articles" section. When importing
  a Doc you can pass `--service hormone-optimization`.
- **SEO:** the optional SEO title and meta description override the defaults
  (post title + " — OVI Wellness", and the short summary).
- **Spanish:** fill in the Spanish version with the same sections in the same order.
  If it is left empty, the Spanish site shows the English text for that post.

## What happens when you save

Saving commits to `main`. A GitHub Action (`.github/workflows/build-blog.yml`) then runs
`scripts/build-blog.js`, which converts the section text to HTML, updates the blog data, creates
the post's own page (`blog/<slug>.html`) and updates `sitemap.xml`, and commits those files.
GitHub Pages publishes the result, usually within a few minutes.

## Previewing locally (like the live site)

```
npm run dev
```

Open http://localhost:8123/. This behaves like GitHub Pages: clean addresses (`/blog`,
`/blog/trt-myths`), the real 404 page, and case-sensitive paths. The preview rebuilds on its own whenever a post file in `content/blog` is saved (including saves
from the editor in local mode), so just refresh. To test the editor without GitHub, open
`/admin/` in Chrome or Edge and choose **Work with Local Repository**.

## Testing on real GitHub Pages (throwaway copy)

For things the local preview can't show: how Pages serves addresses, the build Action, the editor
with a real login. Needs the GitHub CLI (`gh`) signed in.

```
npm run test-site:up        # publish your current files (even uncommitted) to https://<you>.github.io, ~2-3 min
npm run test-site:status
npm run test-site:down      # unpublish: Pages off, repo private
```

`down --delete` removes the repo entirely (`node scripts/test-site.js down --delete`; needs
`gh auth refresh -h github.com -s delete_repo` once). The copy never includes `CNAME`, blocks search
engines, points the editor at the test repo, skips new untracked files over 1 MB, and the script only
touches a repo whose description starts with "TEST COPY". It still runs your Tag Manager and CallRail tags.

## Running the build locally

```
npm ci
node scripts/build-blog.js
```

Generated files (`blog/*.html`, the `posts` list in `assets/js/i18n/*/blog.json`, and the
blog block in `sitemap.xml`) are overwritten by the build. Edit `content/blog/*.json` instead.

## Page titles and descriptions (SEO)

Static `<title>`, meta description and share-card tags for the home, team and service pages are written
from the English data files by `node scripts/sync-seo.js` (`npm run sync:seo`; `npm run check:seo` only
checks). Edit the text in `assets/js/i18n/en/services.json` (and the matching per-service file),
`pages/home.json` or `team.json`, not in the HTML. The GitHub Action runs the sync on every push that
changes those files, so the HTML a crawler downloads always matches the page after JavaScript runs.
