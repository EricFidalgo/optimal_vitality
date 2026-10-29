#!/usr/bin/env node
/**
 * sync-seo.js
 *
 * Writes each page's static <title>, meta description and share-card (og: / twitter:) title and
 * description from the English data files, so the HTML a crawler downloads says the same thing as
 * the page after JavaScript has run. Before this script, the two were edited separately and drifted
 * (Ahrefs shows them as "HTML" and "Rendered").
 *
 *   node scripts/sync-seo.js           rewrite the HTML files where they differ
 *   node scripts/sync-seo.js --check   change nothing; exit 1 if any page is out of sync
 *
 * Sources (English):
 *   services/<id>.html   <-  assets/js/i18n/en/services.json     pageTitle, pageDescription
 *   index.html           <-  assets/js/i18n/en/pages/home.json    seo.title, seo.description
 *   team.html            <-  assets/js/i18n/en/team.json          seo.title, seo.description
 *
 * To cover another page, add it to pages() below. Pages that are not listed are left untouched.
 * Only the text inside the title element and the content="" of the five meta tags is changed.
 * Spanish is not written here: it only exists after JavaScript runs, from the Spanish data files.
 */
"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CHECK = process.argv.includes("--check");

function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8"));
}

function pages() {
  const list = [];
  for (const s of readJson("assets/js/i18n/en/services.json")) {
    list.push({ file: `services/${s.id}.html`, title: s.pageTitle, description: s.pageDescription });
  }
  const home = readJson("assets/js/i18n/en/pages/home.json").seo || {};
  list.push({ file: "index.html", title: home.title, description: home.description });
  const team = readJson("assets/js/i18n/en/team.json").seo || {};
  list.push({ file: "team.html", title: team.title, description: team.description });
  return list;
}

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// Set content="" on the <meta> tag identified by attr="value" (e.g. name="description"). Returns [html, found].
function setMeta(html, attr, value, content) {
  const tag = new RegExp(`<meta\\b[^>]*\\b${attr}="${value}"[^>]*>`);
  const m = tag.exec(html);
  if (!m) return [html, false];
  const next = m[0].replace(/\bcontent="[^"]*"/, () => `content="${esc(content)}"`);
  return [html.slice(0, m.index) + next + html.slice(m.index + m[0].length), true];
}

function sync(html, page) {
  let out = html;
  if (page.title) {
    out = out.replace(/(<title\b[^>]*>)[^<]*(<\/title>)/, (_, a, b) => a + esc(page.title) + b);
    for (const [attr, value] of [["property", "og:title"], ["property", "twitter:title"]]) {
      out = setMeta(out, attr, value, page.title)[0];
    }
  }
  if (page.description) {
    for (const [attr, value] of [["name", "description"], ["property", "og:description"], ["property", "twitter:description"]]) {
      out = setMeta(out, attr, value, page.description)[0];
    }
  }
  return out;
}

const changed = [];
const missing = [];
for (const page of pages()) {
  const file = path.join(ROOT, page.file);
  if (!fs.existsSync(file)) {
    missing.push(page.file);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  const next = sync(html, page);
  if (next !== html) {
    changed.push(page.file);
    if (!CHECK) fs.writeFileSync(file, next);
  }
}

if (missing.length) console.log(`sync-seo: skipped (file not found): ${missing.join(", ")}`);
if (CHECK) {
  if (changed.length) {
    console.error(`sync-seo: out of sync with the data files: ${changed.join(", ")}\nRun: node scripts/sync-seo.js`);
    process.exit(1);
  }
  console.log("sync-seo: all pages are in sync");
} else {
  console.log(changed.length ? `sync-seo: updated ${changed.join(", ")}` : "sync-seo: already in sync");
}
