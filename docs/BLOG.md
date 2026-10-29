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
- **Title** also becomes the web address (`/article-<slug>`) when the post is first created.
  Changing the title later does not change the address.
- **Sections:** the first section is the opening text and its heading is not shown. Section text
  supports bold, links, bullet and numbered lists, tables and sub-headings (Markdown). Pasting
  from Google Docs keeps most formatting.
- **Images:** the **Featured image** shows at the top of the post, on the blog page card and
  in social shares. Each section can also have an image, shown after that section's text.
  Always fill in the image description (alt text). Resize and compress images first
  (about 1200 px wide, under 200 KB). Spanish uses the same images; only the descriptions
  are translated.
- **SEO:** the optional SEO title and meta description override the defaults
  (post title + " — OVI Wellness", and the short summary).
- **Spanish:** fill in the Spanish version with the same sections in the same order.
  If it is left empty, the Spanish site shows the English text for that post.

## What happens when you save

Saving commits to `main`. A GitHub Action (`.github/workflows/build-blog.yml`) then runs
`scripts/build-blog.js`, which converts the section text to HTML, updates the blog data, creates
the post's own page (`article-<slug>.html`) and updates `sitemap.xml`, and commits those files.
GitHub Pages publishes the result, usually within a few minutes.

## Running the build locally

```
npm ci
node scripts/build-blog.js
```

Generated files (`article-*.html`, the `posts` list in `assets/js/i18n/*/blog.json`, and the
blog block in `sitemap.xml`) are overwritten by the build. Edit `content/blog/*.json` instead.
