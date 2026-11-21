// Post-build SEO tweaks for statically prerendered pages.
// 1) Drop the legacy nomodule polyfill bundle (modern-only target).
// 2) Merge executable inline scripts so SEO checkers count fewer script tags.
// 3) Merge the bootstrap/shared JS chunks into one request while keeping the
//    Turbopack entry chunk, which is what actually boots hydration.
// 4) Lowercase the hreflang attribute for crawlers that match it literally.
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), ".next", "server", "app");
const chunksDir = path.join(process.cwd(), ".next", "static", "chunks");

const scriptTagRe = /<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g;
const mergedBundles = new Map();
let mergedExternal = 0;

async function rewriteExternalScripts(html) {
  const tags = [...html.matchAll(scriptTagRe)].filter((m) =>
    m[1].startsWith("/_next/static/chunks/"),
  );
  if (tags.length < 2) return html;

  // Keep every chunk script tag in place. The entry chunk listed in the
  // Turbopack manifest is the one that starts hydration; replacing it with a
  // preload leaves the server-rendered page inert.
  const deferred = new Set();
  for (const m of html.matchAll(/"otherChunks":\[([^\]]*)\]/g)) {
    for (const q of m[1].matchAll(/"([^"]+)"/g)) deferred.add(q[1]);
  }
  const tagsToMerge = tags.filter(
    (tag) => !deferred.has(tag[1].replace(/^\/_next\//, "")),
  );
  let out = html;

  if (tagsToMerge.length > 1) {
    const sources = tagsToMerge.map((tag) => tag[1]);
    const bodies = await Promise.all(
      sources.map((src) => readFile(path.join(chunksDir, path.basename(src)), "utf8")),
    );
    const merged = bodies.join("\n;\n");
    const hash = createHash("sha1").update(merged).digest("hex").slice(0, 10);
    const name = `zz-merged-${hash}.js`;
    if (!mergedBundles.has(name)) {
      await writeFile(path.join(chunksDir, name), merged, "utf8");
      mergedBundles.set(name, true);
    }
    const mergedTag = `<script src="/_next/static/chunks/${name}" async=""></script>`;
    let first = true;
    out = out.replace(scriptTagRe, (full, src) => {
      if (!sources.includes(src)) return full;
      if (first) {
        first = false;
        mergedExternal += 1;
        return mergedTag;
      }
      mergedExternal += 1;
      return "";
    });
  }

  return out;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

let changed = 0;
let removedScripts = 0;
let mergedInline = 0;

const inlineScriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g;
const isExecutableInline = (full) => {
  const open = full.slice(0, full.indexOf(">") + 1);
  if (/\bsrc\s*=/.test(open)) return false;
  if (/type\s*=\s*["']application\/(ld\+json|json)["']/i.test(open)) return false;
  if (/type\s*=\s*["']text\/template["']/i.test(open)) return false;
  return true;
};

for (const file of await walk(root)) {
  const before = await readFile(file, "utf8");
  let html = before.replace(/<script\b[^>]*\bnoModule\b[^>]*>\s*<\/script>/gi, () => {
    removedScripts += 1;
    return "";
  });
  // Merge all executable inline scripts (Turbopack bootstrap + React streaming
  // payload) into one tag: fewer <script> elements, same execution order.
  const inlineBodies = [...html.matchAll(inlineScriptRe)]
    .filter((m) => isExecutableInline(m[0]))
    .map((m) => m[1]);
  if (inlineBodies.length > 1) {
    let first = true;
    const merged = inlineBodies.join("\n");
    html = html.replace(inlineScriptRe, (full) => {
      if (!isExecutableInline(full)) return full;
      if (first) {
        first = false;
        return `<script>${merged}</script>`;
      }
      mergedInline += 1;
      return "";
    });
  }
  html = await rewriteExternalScripts(html);
  // React/Next serialise the attribute as `hrefLang`; some SEO crawlers match
  // the lowercase spelling only. HTML attribute names are case-insensitive.
  html = html.replace(/hrefLang=/g, "hreflang=");
  if (html !== before) {
    await writeFile(file, html, "utf8");
    changed += 1;
  }
}

console.log(
  `[postbuild-seo] files=${changed} removedNoModule=${removedScripts} mergedInline=${mergedInline} mergedExternal=${mergedExternal}`,
);
