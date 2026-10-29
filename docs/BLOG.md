# Blog editing

Posts live in `content/blog/<slug>.json`, one file per post. You normally never
touch these by hand: use the editor at **https://oviwellness.com/admin/**.

## Signing in (once per browser)

1. On GitHub create a **fine-grained personal access token**
   (Settings > Developer settings > Personal access tokens > Fine-grained tokens).
   Repository: `EricFidalgo/optimal_vitality`. Permission: **Contents: Read and write**.
2. Open `/admin/`, choose **Sign In with Token**, paste the token.
   The token is stored in that browser only. You need write access to the repo.

## Writing a post

- **Published** off = draft. Nothing appears on the site until it is on.
- **Title** also becomes the web address (`/article-<slug>`) when the post is first saved.
  Changing the title later does not change the address.
- **Sections:** the first section is the opening paragraph (its heading is not shown).
  Separate paragraphs inside a section with a blank line.
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
`scripts/build-blog.js`, which updates the blog data, creates the post's own page
(`article-<slug>.html`) and updates `sitemap.xml`, and commits those files. GitHub Pages
publishes the result, usually within a few minutes.

## Running the build locally

```
node scripts/build-blog.js
```

Generated files (`article-*.html`, the `posts` list in `assets/js/i18n/*/blog.json`, and the
blog block in `sitemap.xml`) are overwritten by the build. Edit `content/blog/*.json` instead.
