#!/usr/bin/env node
/**
 * test-site.js
 *
 * Puts a throwaway copy of the site on real GitHub Pages so you can test things the local
 * preview cannot (how Pages serves addresses, the build Action, the editor with a real login),
 * and takes it down again.
 *
 *   node scripts/test-site.js up       publish the current working files to <you>.github.io
 *   node scripts/test-site.js down     unpublish (Pages off, repo made private)
 *   node scripts/test-site.js down --delete    also delete the repo (needs: gh auth refresh -s delete_repo)
 *   node scripts/test-site.js status
 *
 * Needs the GitHub CLI (gh) signed in, and git and Node. Takes about 2-3 minutes to go live.
 *
 * What "up" does
 *   - Copies your working files (including uncommitted changes) to a temp folder. Your project,
 *     branch and commits are never touched. Files git ignores, CNAME, .claude and node_modules are left out.
 *   - Points the editor config at the test repo, replaces robots.txt with "Disallow: /" and
 *     leaves out CNAME, so the copy cannot claim your real domain or get indexed.
 *   - Pushes it to the repo <your-github-login>/<your-github-login>.github.io (a "user site", which
 *     is served from the root of https://<login>.github.io/ like the real site), turns Pages on.
 *   - It only ever overwrites a repo whose description starts with "TEST COPY".
 * The copy fires your Tag Manager and CallRail tags from the test address; filter it out in GA if needed.
 */
"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MARK = "TEST COPY";
const DESCRIPTION = `${MARK} of the OVI Wellness site for checking GitHub Pages behavior. Not the live site.`;

function fail(msg) {
  console.error("test-site: " + msg);
  process.exit(1);
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32" && /^(npm)$/.test(cmd), ...opts });
  return r;
}

function must(cmd, args, opts) {
  const r = run(cmd, args, opts);
  if (r.error || r.status !== 0) fail(`${cmd} ${args.join(" ")} failed:\n${(r.stderr || r.stdout || (r.error && r.error.message) || "").trim()}`);
  return (r.stdout || "").trim();
}

const gh = (args) => run("gh", args);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function identity() {
  const r = gh(["api", "user", "--jq", ".login"]);
  if (r.error || r.status !== 0) fail("the GitHub CLI (gh) is not installed or not signed in. Run: gh auth login");
  const owner = r.stdout.trim();
  return { owner, repoName: `${owner}.github.io`, full: `${owner}/${owner}.github.io`, url: `https://${owner}.github.io` };
}

function repoInfo(full) {
  const r = gh(["repo", "view", full, "--json", "description,isPrivate"]);
  if (r.status !== 0) return null;
  return JSON.parse(r.stdout);
}

function guard(full, info) {
  if (info && !String(info.description || "").startsWith(MARK)) {
    fail(`${full} exists but its description does not start with "${MARK}", so it is not a test copy. Refusing to touch it.`);
  }
}

async function status(id) {
  const info = repoInfo(id.full);
  if (!info) return console.log(`No test repo yet (${id.full}). Run: node scripts/test-site.js up`);
  const pages = gh(["api", `repos/${id.full}/pages`, "--jq", ".html_url"]);
  const live = pages.status === 0;
  console.log(`Repo:  https://github.com/${id.full}  (${info.isPrivate ? "private" : "public"})`);
  console.log(`Pages: ${live ? "on, " + pages.stdout.trim() : "off"}`);
}

// ---------------------------------------------------------------------------

async function up(id) {
  const info = repoInfo(id.full);
  guard(id.full, info);

  // 1. Copy the working files.
  // Tracked files (with your uncommitted edits) plus new untracked files. New untracked files over 1 MB
  // (usually a local test image) are skipped so they do not end up on a public repo by accident.
  const split = (s) => s.split("\0").filter(Boolean);
  const tracked = new Set(split(must("git", ["ls-files", "--cached", "-z"], { cwd: ROOT, maxBuffer: 1 << 28 })));
  const untracked = split(must("git", ["ls-files", "--others", "--exclude-standard", "-z"], { cwd: ROOT, maxBuffer: 1 << 28 }));
  const MAX_NEW = 1024 * 1024;
  const skipped = [];
  const files = [...tracked, ...untracked].filter((f) => {
    if (/^(\.claude|node_modules)\//.test(f) || f === "CNAME") return false;
    const abs = path.join(ROOT, f);
    if (!fs.existsSync(abs)) return false;
    if (!tracked.has(f) && fs.statSync(abs).size > MAX_NEW) {
      skipped.push(`${f} (${(fs.statSync(abs).size / 1048576).toFixed(1)} MB)`);
      return false;
    }
    return true;
  });
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ovi-test-site-"));
  for (const f of files) {
    const to = path.join(tmp, f);
    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(path.join(ROOT, f), to);
  }
  console.log(`Copied ${files.length} files to a temp folder (your project is untouched).`);
  if (skipped.length) console.log(`  skipped new file(s) over 1 MB: ${skipped.join(", ")}`);

  // 2. Make the copy safe to publish.
  const cfg = path.join(tmp, "admin", "config.yml");
  if (fs.existsSync(cfg)) {
    const c = fs
      .readFileSync(cfg, "utf8")
      .replace(/^(\s*repo:\s*).*$/m, `$1${id.full}`)
      .replace(/^site_url:.*$/m, `site_url: ${id.url}`)
      .replace(/^display_url:.*$/m, `display_url: ${id.url}`);
    fs.writeFileSync(cfg, c);
  }
  fs.writeFileSync(path.join(tmp, "robots.txt"), "User-agent: *\nDisallow: /\n");

  // 3. Rebuild the blog pages inside the copy so they match the content files.
  if (fs.existsSync(path.join(tmp, "package-lock.json"))) {
    // Run npm through node when its script is next to the node binary (avoids a shell on Windows).
    const npmCli = path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npm-cli.js");
    if (fs.existsSync(npmCli)) must(process.execPath, [npmCli, "ci"], { cwd: tmp });
    else must("npm", ["ci"], { cwd: tmp });
  }
  if (fs.existsSync(path.join(tmp, "scripts", "build-blog.js"))) must(process.execPath, ["scripts/build-blog.js"], { cwd: tmp });

  // 4. Commit and push.
  const branch = run("git", ["branch", "--show-current"], { cwd: ROOT }).stdout.trim() || "detached";
  const sha = run("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT }).stdout.trim();
  must("git", ["init", "-q", "-b", "main"], { cwd: tmp });
  must("git", ["add", "-A"], { cwd: tmp });
  must("git", ["commit", "-q", "-m", `${MARK} of the OVI Wellness site (from ${branch} @ ${sha}, includes uncommitted work)\n\nThrowaway deployment: no CNAME, search engines blocked. Not the live site.`], { cwd: tmp });
  const pushed = must("git", ["rev-parse", "HEAD"], { cwd: tmp });

  if (!info) {
    console.log(`Creating public repo ${id.full}...`);
    must("gh", ["repo", "create", id.full, "--public", "--description", DESCRIPTION, "--source", ".", "--remote", "origin", "--push"], { cwd: tmp });
  } else {
    console.log(`Updating ${id.full}...`);
    if (info.isPrivate) must("gh", ["repo", "edit", id.full, "--visibility", "public", "--accept-visibility-change-consequences"]);
    must("git", ["remote", "add", "origin", `https://github.com/${id.full}.git`], { cwd: tmp });
    // Push with the GitHub CLI's own credentials: a stored git credential may lack the "workflow" scope,
    // which GitHub requires for any push that contains .github/workflows files (it fails with HTTP 403).
    must("git", ["-c", "credential.helper=", "-c", "credential.helper=!gh auth git-credential", "push", "-q", "--force", "origin", "main"], { cwd: tmp });
  }

  // 5. Turn on Pages (already on is fine) and wait for the build of this commit.
  const p = gh(["api", "-X", "POST", `repos/${id.full}/pages`, "-f", "source[branch]=main", "-f", "source[path]=/"]);
  if (p.status !== 0 && !/already enabled|409/.test(p.stderr + p.stdout)) fail(`could not turn on Pages:\n${p.stderr || p.stdout}`);

  console.log("Waiting for GitHub Pages to publish (usually 1-3 minutes)...");
  let built = false;
  for (let i = 0; i < 40 && !built; i++) {
    await sleep(8000);
    const b = gh(["api", `repos/${id.full}/pages/builds/latest`, "--jq", '.status + " " + .commit']);
    if (b.status !== 0) continue;
    const [state, commit] = b.stdout.trim().split(" ");
    if (state === "errored") fail("the Pages build failed. See https://github.com/" + id.full + "/actions");
    if (state === "built" && commit === pushed) built = true;
  }
  if (!built) console.log("  (still building; check again in a minute)");

  // 6. Smoke check.
  const slug = (fs.existsSync(path.join(tmp, "blog")) ? fs.readdirSync(path.join(tmp, "blog")).find((f) => f.endsWith(".html")) : null) || "";
  const checks = ["/", "/blog", slug ? "/blog/" + slug.replace(/\.html$/, "") : null, "/definitely-missing"].filter(Boolean);
  for (const c of checks) {
    try {
      const r = await fetch(id.url + c, { redirect: "manual" });
      console.log(`  ${String(r.status).padEnd(4)} ${c}${c === "/definitely-missing" ? "  (404 is correct)" : ""}`);
    } catch (e) {
      console.log(`  ---  ${c}  (${e.message})`);
    }
  }
  console.log(`\nTest site: ${id.url}/`);
  console.log(`Editor:   ${id.url}/admin/  (sign in with a token that has Contents: Read and write on ${id.full})`);
  console.log("Take it down with: node scripts/test-site.js down");
  fs.rmSync(tmp, { recursive: true, force: true });
}

async function down(id, deleteRepo) {
  const info = repoInfo(id.full);
  if (!info) return console.log(`Nothing to take down: ${id.full} does not exist.`);
  guard(id.full, info);

  if (deleteRepo) {
    const r = gh(["repo", "delete", id.full, "--yes"]);
    if (r.status !== 0) {
      console.error(`Could not delete the repo:\n${(r.stderr || r.stdout).trim()}`);
      console.error("If this is a permission error, run: gh auth refresh -h github.com -s delete_repo   and try again.");
      console.error("Or delete it by hand: https://github.com/" + id.full + "/settings (Danger Zone).");
      process.exit(1);
    }
    console.log(`Deleted ${id.full}. The next "up" will create it again.`);
    return;
  }

  // GitHub does not allow Pages to be switched off on a <name>.github.io repo, so the site is taken down
  // by making the repo private (Pages needs a public repo on a free plan).
  if (!info.isPrivate) must("gh", ["repo", "edit", id.full, "--visibility", "private", "--accept-visibility-change-consequences"]);
  console.log(`${id.full} is now private. Waiting for the site to go offline...`);

  let offline = false;
  for (let i = 0; i < 12 && !offline; i++) {
    try {
      const r = await fetch(id.url + "/?nocache=" + Date.now(), { redirect: "manual" });
      offline = r.status === 404;
    } catch (e) {
      offline = true;
    }
    if (!offline) await sleep(10000);
  }
  if (offline) console.log(`The site is unpublished (${id.url}/ answers 404). GitHub's cache can keep serving some pages for up to about 10 minutes.`);
  else console.log(`${id.url}/ still answers after 2 minutes. If it stays up, delete the repo: node scripts/test-site.js down --delete`);
  console.log('Bring it back with: node scripts/test-site.js up   (it makes the repo public again and republishes)');
}

(async () => {
  const [cmd, flag] = process.argv.slice(2);
  const id = identity();
  if (cmd === "up") return up(id);
  if (cmd === "down") return down(id, flag === "--delete");
  if (cmd === "status") return status(id);
  fail("usage: node scripts/test-site.js up | down [--delete] | status");
})();
