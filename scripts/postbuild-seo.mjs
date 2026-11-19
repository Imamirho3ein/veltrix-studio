// Post-build SEO tweaks for statically prerendered pages.
// 1) Drop the legacy nomodule polyfill bundle (modern-only target).
// 2) Put a space after sentence-ending periods that sit directly before a tag,
//    so text extracted from the raw HTML keeps the space after the dot.
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.join(process.cwd(), ".next", "server", "app");

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
let spacedDots = 0;

for (const file of await walk(root)) {
  const before = await readFile(file, "utf8");
  let html = before.replace(/<script\b[^>]*\bnoModule\b[^>]*>\s*<\/script>/gi, () => {
    removedScripts += 1;
    return "";
  });
  html = html.replace(/\.<\//g, () => {
    spacedDots += 1;
    return ". </";
  });
  html = html.replace(/…<\//g, () => {
    spacedDots += 1;
    return "… </";
  });
  // React/Next serialise the attribute as `hrefLang`; some SEO crawlers match
  // the lowercase spelling only. HTML attribute names are case-insensitive.
  html = html.replace(/hrefLang=/g, "hreflang=");
  if (html !== before) {
    await writeFile(file, html, "utf8");
    changed += 1;
  }
}

console.log(
  `[postbuild-seo] files=${changed} removedNoModule=${removedScripts} spacedDots=${spacedDots}`,
);
