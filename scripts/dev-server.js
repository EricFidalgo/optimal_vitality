#!/usr/bin/env node
/**
 * dev-server.js
 *
 * Local preview that behaves like GitHub Pages, so you can test before going live:
 *   - clean URLs:      /blog -> blog.html, /services/detox -> services/detox.html
 *   - folder indexes:  /admin/ -> admin/index.html (and /admin redirects to /admin/)
 *   - missing pages:   served with 404.html and a 404 status
 *   - case-sensitive:  /Blog is a 404, because GitHub Pages is case-sensitive even though
 *                      Windows files are not (this catches broken links before they go live)
 *
 *   - auto-rebuild:    runs the blog build at start and whenever a file in content/blog (or
 *                      article.html) changes, so editor saves show up after a refresh
 *
 *   - slow files:      DEV_DELAY="locations.json=1500" sends that file's headers at once and its body 1.5 s later
 *                      (comma-separated list), to reproduce timing races when data files finish in a different order
 *
 * Usage:  node scripts/dev-server.js          (then open http://localhost:8123/)
 *         PORT=3000 node scripts/dev-server.js
 * No dependencies. Listens on this computer only.
 */
"use strict";

const http = require("http");
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORT = parseInt(process.env.PORT, 10) || 8123;
// DEV_DELAY="locations.json=1500,team.json=800": artificial delay (ms) per file name, for race testing.
const DELAYS = {};
(process.env.DEV_DELAY || "").split(",").filter(Boolean).forEach((s) => {
  const [name, ms] = s.split("=");
  DELAYS[name.trim()] = parseInt(ms, 10) || 0;
});

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".yml": "text/yaml; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

// Returns the real path if a file exists with exactly this case, else null.
function fileExactCase(abs) {
  const rel = path.relative(ROOT, abs);
  if (rel.startsWith("..") || path.isAbsolute(rel)) return null;
  let cur = ROOT;
  for (const part of rel.split(path.sep)) {
    let names;
    try {
      names = fs.readdirSync(cur);
    } catch (e) {
      return null;
    }
    if (!names.includes(part)) return null;
    cur = path.join(cur, part);
  }
  try {
    return fs.statSync(cur).isFile() ? cur : null;
  } catch (e) {
    return null;
  }
}

function resolve(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  if (clean.split(path.sep).some((p) => p === ".git" || p === "node_modules")) return null;
  const base = path.join(ROOT, clean);
  const candidates = urlPath.endsWith("/")
    ? [path.join(base, "index.html")]
    : [base, base + ".html", path.join(base, "index.html")];
  for (const c of candidates) {
    const hit = fileExactCase(c);
    if (hit) return hit;
  }
  return null;
}

function send(res, status, file) {
  const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
  res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
  fs.createReadStream(file).pipe(res);
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = new URL(req.url, "http://localhost").pathname;
    const file = resolve(pathname);
    if (file) {
      // A folder without a trailing slash redirects to the slash version, like GitHub Pages
      // (relative links inside the folder, such as admin/config.yml, depend on it).
      if (path.basename(file) === "index.html" && !pathname.endsWith("/") && !pathname.endsWith("index.html")) {
        res.writeHead(301, { Location: pathname + "/" });
        return res.end();
      }
      const delay = DELAYS[path.basename(file)];
      if (delay) {
        const type = TYPES[path.extname(file).toLowerCase()] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
        res.flushHeaders();
        return setTimeout(() => fs.createReadStream(file).pipe(res), delay);
      }
      return send(res, 200, file);
    }
  } catch (e) {
    // fall through to 404
  }
  const notFound = fileExactCase(path.join(ROOT, "404.html"));
  console.log(`404  ${req.url}`);
  if (notFound) return send(res, 404, notFound);
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404 Not Found");
});

// -- auto-rebuild ------------------------------------------------------------

let building = false;
let rebuildAgain = false;
let timer = null;

function rebuild(reason) {
  if (building) {
    rebuildAgain = true;
    return;
  }
  building = true;
  const started = Date.now();
  const child = spawn(process.execPath, [path.join(__dirname, "build-blog.js")], { cwd: ROOT });
  let out = "";
  child.stdout.on("data", (d) => (out += d));
  child.stderr.on("data", (d) => (out += d));
  child.on("close", (code) => {
    building = false;
    const lines = out.trim().split("\n").map((l) => "  " + l).join("\n");
    console.log(`${code === 0 ? "Rebuilt" : "BUILD FAILED"} blog (${reason}, ${Date.now() - started} ms)${code === 0 ? "" : "\n" + lines}`);
    if (code === 0 && /updated: (?!nothing)/.test(out)) console.log(lines);
    if (rebuildAgain) {
      rebuildAgain = false;
      rebuild("changes during build");
    }
  });
}

function scheduleRebuild(reason) {
  clearTimeout(timer);
  timer = setTimeout(() => rebuild(reason), 400);
}

function watch(target, filter) {
  try {
    fs.watch(path.join(ROOT, target), { recursive: true }, (evt, file) => {
      if (filter && file && !filter(String(file))) return;
      scheduleRebuild(`${target} changed`);
    });
  } catch (e) {
    console.log(`(could not watch ${target}: ${e.message})`);
  }
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Preview running at http://localhost:${PORT}/  (like GitHub Pages: clean URLs, 404 page, case-sensitive)`);
  console.log("Blog rebuilds automatically when content/blog changes. Press Ctrl+C to stop.");
  rebuild("startup");
  watch("content/blog", (f) => f.endsWith(".json"));
  fs.watchFile(path.join(ROOT, "article.html"), { interval: 700 }, () => scheduleRebuild("article.html changed"));
});
