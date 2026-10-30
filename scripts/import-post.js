#!/usr/bin/env node
/**
 * import-post.js
 *
 * Turns a Google Doc, downloaded as Markdown, into a blog post file in content/blog/.
 *
 *   In Google Docs:  File > Download > Markdown (.md)
 *   Then run:        node scripts/import-post.js path/to/doc.md [options]
 *
 * Options
 *   --slug <slug>        Web address / file name (default: made from the title)
 *   --date YYYY-MM-DD    Publish date (default: today)
 *   --category "<name>"  Category label (default: empty)
 *   --service <id>       Related service page, e.g. hormone-optimization (default: none)
 *   --publish            Mark the post published (default: draft)
 *   --force              Overwrite an existing post with the same slug
 *
 * What it does
 *   - Title comes from the first "# " heading.
 *   - Each "## " heading starts a section; text before the first one becomes the opening section.
 *   - "Sources:" and "Disclaimer:" paragraphs become their own sections.
 *   - Replaces the Google Docs table of contents with an automatic one (show_toc),
 *     removes "[END ARTICLE]" and everything after it,
 *     [button ...] placeholders, embedded images and tracking parameters on links.
 *   - Tidies tables (empty header rows, stray asterisks).
 *   - Lists anything that still needs a human (placeholders, odd headings, missing fields).
 *
 * After importing, finish the post in the editor at /admin/ (featured image, SEO title and
 * description, category, Spanish version), then switch Published on.
 * Run "node scripts/build-blog.js" afterward (or let the GitHub Action do it).
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "blog");

function fail(msg) {
  console.error("import-post: " + msg);
  process.exit(1);
}

// -- args -------------------------------------------------------------------

const args = process.argv.slice(2);
const opts = { publish: false, force: false };
let file = null;
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--publish") opts.publish = true;
  else if (a === "--force") opts.force = true;
  else if (a === "--slug" || a === "--date" || a === "--category" || a === "--service") opts[a.slice(2)] = args[++i];
  else if (a.startsWith("--")) fail(`unknown option ${a}`);
  else file = a;
}
if (!file) fail("usage: node scripts/import-post.js <doc.md> [--slug s] [--date YYYY-MM-DD] [--category name] [--publish] [--force]");
if (!fs.existsSync(file)) fail(`file not found: ${file}`);
if (opts.date && !/^\d{4}-\d{2}-\d{2}$/.test(opts.date)) fail("--date must look like 2026-08-14");
if (opts.slug && !/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(opts.slug)) fail("--slug may only contain letters, numbers and dashes");

const warnings = [];
const warn = (m) => warnings.push(m);

// -- clean up the Markdown --------------------------------------------------

let text = fs.readFileSync(file, "utf8").replace(/^﻿/, "").replace(/\r\n?/g, "\n");

// Embedded images (Docs exports them as base64) cannot be used; add images in the editor instead.
const imageCount = (text.match(/!\[[^\]]*\]\([^)]*\)|!\[[^\]]*\]\[[^\]]*\]/g) || []).length;
text = text
  .replace(/^\[image\d+\]:\s*<?data:[^\n]*$/gim, "")
  .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
  .replace(/!\[[^\]]*\]\[[^\]]*\]/g, "");
if (imageCount) warn(`${imageCount} image(s) in the Doc were not imported. Add them in the editor (featured image or section images).`);

// Stop at the end marker; anything after it (extra tabs, notes) is not part of the post.
const endMatch = /^\\?\[END ARTICLE\\?\]\s*$/im.exec(text);
if (endMatch) text = text.slice(0, endMatch.index);

let lines = text.split("\n").map((l) => (l.trim() === "" ? "" : l.replace(/\s+$/, "")));

// Google tab headings ("# Tab 1") are not content.
lines = lines.filter((l) => !/^#\s+\**Tab \d+\**\s*$/i.test(l));

// Table of contents: the heading plus the run of links to #heading=... anchors that follows it.
// The post page builds its own contents list from the section headings, so the Doc's copy is dropped
// and "show_toc" is switched on instead.
let hadToc = false;
{
  const out = [];
  let skipping = false;
  for (const l of lines) {
    if (/^#{1,6}\s+\**table of contents\**\s*$/i.test(l)) { skipping = true; hadToc = true; continue; }
    if (skipping) {
      if (l === "" || /^\[\**.*?\**\]\(https:\/\/docs\.google\.com\/[^)]*#heading=[^)]*\)\s*$/.test(l)) continue;
      skipping = false;
    }
    out.push(l);
  }
  lines = out;
}

// Placeholders and editor notes.
{
  const out = [];
  for (const l of lines) {
    if (/^\\?\[button\b/i.test(l.trim())) {
      warn(`Removed a button placeholder: ${l.trim().replace(/\\/g, "")}. Posts get the standard "Book Consultation" call to action automatically.`);
      continue;
    }
    if (/^\((update|todo|insert|add|note)\b[^)]*\)\s*$/i.test(l.trim())) {
      warn(`Removed an editor note: ${l.trim()}`);
      continue;
    }
    out.push(l);
  }
  lines = out;
}

// Headings: strip bold markers; a "heading" that is really a sentence becomes a paragraph.
lines = lines.map((l) => {
  const m = /^(#{1,6})\s+(.*)$/.exec(l);
  if (!m) return l;
  const t = m[2].replace(/\*\*/g, "").replace(/\\([*_#])/g, "$1").trim();
  if (m[1].length >= 3 && (t.length > 100 || /[.!]$/.test(t))) {
    warn(`A long line was formatted as a heading in the Doc, so it was made a normal paragraph: "${t.slice(0, 60)}..."`);
    return t;
  }
  return `${m[1]} ${t}`;
});

// Tables: drop an empty header row, un-escape bold markers, left-align columns.
{
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith("|")) {
      const block = [];
      while (i < lines.length && lines[i].startsWith("|")) block.push(lines[i++]);
      i--;
      let rows = block.map((r) => r.replace(/\\\*/g, "*"));
      const isSep = (r) => /^\|[\s:|-]+\|$/.test(r) && r.includes("-");
      const isEmpty = (r) => /^\|[\s|]*\|$/.test(r) && !isSep(r);
      if (rows.length > 2 && isEmpty(rows[0]) && isSep(rows[1])) {
        const sep = rows[1].replace(/:?-+:?/g, "---");
        rows = [rows[2], sep, ...rows.slice(3)];
      } else {
        rows = rows.map((r) => (isSep(r) ? r.replace(/:?-+:?/g, "---") : r));
      }
      out.push("", ...rows, "");
    } else {
      out.push(l);
    }
  }
  lines = out;
}

// Lists: Docs indents top-level list items by two spaces. Markdown reads an item indented to the
// level of the previous item's text as a nested list, so remove the shared indent from each list block.
{
  const itemRe = /^(\s*)([-*+]|\d+[.)])\s/;
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!itemRe.test(lines[i])) { out.push(lines[i]); continue; }
    const block = [];
    while (i < lines.length && (itemRe.test(lines[i]) || (lines[i] !== "" && /^\s+\S/.test(lines[i])))) block.push(lines[i++]);
    i--;
    const indent = Math.min(...block.filter((l) => itemRe.test(l)).map((l) => itemRe.exec(l)[1].length));
    for (const l of block) out.push(l.replace(new RegExp("^ {0," + indent + "}"), ""));
  }
  lines = out;
}

text = lines.join("\n");

// Links: remove tracking parameters and the stray "DOI" link some exports add after a source.
text = text
  .replace(/\[ +([^\]]+?)\]\(/g, " [$1](") // Docs puts the space inside the link text
  .replace(/[?&]utm_[a-z]+=[^)\s&>]*/gi, "")
  .replace(/\[\s*DOI\s*\]\([^)]*\)/gi, "")
  .replace(/<(https?:\/\/[^>\s]+)>/g, "[$1]($1)");

// -- title ------------------------------------------------------------------

lines = text.split("\n");
const titleIdx = lines.findIndex((l) => /^#\s+\S/.test(l));
if (titleIdx === -1) fail('no title found: the Doc needs a "# " (Title or Heading 1) line');
const title = lines[titleIdx].replace(/^#\s+/, "").replace(/\*\*/g, "").trim();
lines.splice(titleIdx, 1);

// -- sections ---------------------------------------------------------------

// "**Sources:**" and "**Disclaimer:** text" paragraphs become their own sections.
{
  const out = [];
  for (const l of lines) {
    const src = /^\*\*Sources:?\*\*:?\s*$/i.exec(l.trim());
    const dis = /^\*\*Disclaimer:?\*\*:?\s*(.*)$/i.exec(l.trim());
    if (src) out.push("", "## Sources", "");
    else if (dis) out.push("", "## Disclaimer", "", dis[1]);
    else out.push(l);
  }
  lines = out;
}

const sections = [];
let current = { title: "Overview", body: [] };
for (const l of lines) {
  const h = /^##\s+(.*)$/.exec(l);
  if (h && !l.startsWith("###")) {
    sections.push(current);
    current = { title: h[1].trim(), body: [] };
  } else {
    current.body.push(l);
  }
}
sections.push(current);

const content = sections
  .map((s) => ({ title: s.title, body: s.body.join("\n").replace(/\n{3,}/g, "\n\n").trim() }))
  .filter((s, i) => s.body !== "" || i > 0);
if (content.length === 0 || content[0].body === "") warn("The Doc has no opening text before the first heading.");

// -- excerpt ----------------------------------------------------------------

function plain(md) {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
const firstPara = (content[0] ? content[0].body : "").split(/\n\s*\n/).map(plain).find((p) => p && !/^[-+]\s|^\d+\.\s/.test(p)) || "";
let excerpt = firstPara;
if (excerpt.length > 155) {
  const cut = excerpt.slice(0, 155);
  const sentence = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  excerpt = sentence > 80 ? cut.slice(0, sentence + 1) : cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

// -- checks that need a human -----------------------------------------------

const leftovers = /\b(XXX|TODO|TBD|lorem ipsum)\b|\[insert/i;
for (const s of content) {
  if (leftovers.test(s.title + " " + s.body)) warn(`Placeholder text left in section "${s.title}" (XXX / TODO / [insert ...]).`);
}
for (const s of content) {
  for (const m of s.body.matchAll(/\]\(([^)]*)\)/g)) {
    if (/docs\.google\.com/.test(m[1])) warn(`A link in "${s.title}" still points to Google Docs: ${m[1].slice(0, 70)}`);
  }
}
// -- write ------------------------------------------------------------------

function slugify(t) {
  const base = t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (base.length <= 60) return base;
  const cut = base.slice(0, 60);
  return cut.slice(0, Math.max(cut.lastIndexOf("-"), 20)).replace(/-+$/, "");
}
const slug = opts.slug || slugify(title);
if (!slug) fail("could not make a slug from the title; pass --slug");

fs.mkdirSync(CONTENT_DIR, { recursive: true });
const out = path.join(CONTENT_DIR, slug + ".json");
if (fs.existsSync(out) && !opts.force) fail(`content/blog/${slug}.json already exists. Use --force to overwrite, or --slug for a different address.`);

const today = new Date();
const date = opts.date || `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const post = {
  published: opts.publish,
  date,
  title,
  category: opts.category || "",
  ...(opts.service ? { service: opts.service } : {}),
  excerpt,
  ...(hadToc ? { show_toc: true } : {}),
  content,
};
fs.writeFileSync(out, JSON.stringify(post, null, 2) + "\n");

if (hadToc) warn("The Doc had a table of contents: the post builds its own from the section headings (Show table of contents is on).");
if (!opts.category) warn("No category set. Pass --category or fill it in the editor.");
warn("Excerpt was made from the opening paragraph. Check it, and add an SEO title and meta description in the editor.");
warn("No featured image and no Spanish version yet.");

console.log(`import-post: wrote content/blog/${slug}.json`);
console.log(`  title:    ${title}`);
console.log(`  status:   ${opts.publish ? "published" : "draft (Published is off)"}   date: ${date}`);
console.log(`  sections: ${content.length}  (${content.map((s) => s.title).join(" | ")})`);
console.log(`  excerpt:  ${excerpt}`);
if (warnings.length) {
  console.log("\nNeeds attention:");
  for (const w of warnings) console.log("  - " + w);
}
