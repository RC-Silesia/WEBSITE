import fs from "node:fs";
import path from "node:path";

const htmlFiles = [
  "index.html",
  "rotary-for-planet.html",
  "privacy.html",
  "newsletter-preview.html",
  "mlodziez-wymiana.html",
  "mlodziez-rotaract.html",
];

const failures = [];
const passes = [];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function lineOf(text, index) {
  return text.slice(0, Math.max(0, index)).split(/\n/).length;
}

function location(file, text, index) {
  return `${file}:${lineOf(text, index)}`;
}

function pass(message) {
  passes.push(`PASS ${message}`);
}

function fail(file, text, index, message) {
  failures.push(`FAIL ${location(file, text, index)} ${message}`);
}

function getAttr(tag, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`\\s${escaped}(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>` + "`" + `]+)))?`, "i");
  const match = tag.match(pattern);
  if (!match) return null;
  if (match[1] !== undefined) return match[1];
  if (match[2] !== undefined) return match[2];
  if (match[3] !== undefined) return match[3];
  return "";
}

function hasAttr(tag, name) {
  return getAttr(tag, name) !== null;
}

function stripTags(value) {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tags(text, tagName) {
  const pattern = new RegExp(`<${tagName}\\b[^>]*>`, "gi");
  return Array.from(text.matchAll(pattern)).map((match) => ({
    tag: match[0],
    index: match.index ?? 0,
  }));
}

function allStartTags(text) {
  const pattern = /<([a-z][a-z0-9:-]*)\b[^>]*>/gi;
  return Array.from(text.matchAll(pattern)).map((match) => ({
    name: match[1].toLowerCase(),
    tag: match[0],
    index: match.index ?? 0,
  }));
}

function collectIds(text) {
  const ids = new Set();
  for (const match of text.matchAll(/\sid\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s"'=<>`]+))/gi)) {
    ids.add(match[1] || match[2] || match[3]);
  }
  return ids;
}

function linkInnerHtml(text, anchor) {
  const end = text.indexOf("</a>", anchor.index + anchor.tag.length);
  if (end === -1) return "";
  return text.slice(anchor.index + anchor.tag.length, end);
}

function imgAltText(html) {
  let value = "";
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const alt = getAttr(match[0], "alt");
    if (alt) value += ` ${alt}`;
  }
  return value.trim();
}

function hasAccessibleNameForLink(text, anchor) {
  const ariaLabel = getAttr(anchor.tag, "aria-label");
  const title = getAttr(anchor.tag, "title");
  const inner = linkInnerHtml(text, anchor);
  const textName = stripTags(inner);
  const imageName = imgAltText(inner);
  return Boolean(
    (ariaLabel && ariaLabel.trim()) ||
    (title && title.trim()) ||
    textName ||
    imageName
  );
}

function isWrappedByLabel(text, index) {
  const before = text.slice(0, index);
  const lastOpen = before.lastIndexOf("<label");
  const lastClose = before.lastIndexOf("</label>");
  if (lastOpen === -1 || lastOpen < lastClose) return false;
  const nextClose = text.indexOf("</label>", index);
  return nextClose !== -1;
}

function looksLikeHoneypot(tag) {
  const className = getAttr(tag, "class") || "";
  return (
    getAttr(tag, "data-honeypot") === "true" ||
    getAttr(tag, "name") === "_honey" ||
    /\bhp\b/.test(className)
  );
}

function isControlledHoneypot(tag) {
  return (
    looksLikeHoneypot(tag) &&
    getAttr(tag, "aria-hidden") === "true" &&
    getAttr(tag, "tabindex") === "-1" &&
    getAttr(tag, "autocomplete") === "off"
  );
}

function hasFormControlLabel(text, tagInfo, labelsFor) {
  const type = (getAttr(tagInfo.tag, "type") || "").toLowerCase();
  if (["hidden", "submit", "button", "reset"].includes(type)) return true;
  if (isControlledHoneypot(tagInfo.tag)) return true;
  if ((getAttr(tagInfo.tag, "aria-label") || "").trim()) return true;
  if ((getAttr(tagInfo.tag, "aria-labelledby") || "").trim()) return true;
  const id = getAttr(tagInfo.tag, "id");
  if (id && labelsFor.has(id)) return true;
  return isWrappedByLabel(text, tagInfo.index);
}

function labelsFor(text) {
  const result = new Set();
  for (const label of tags(text, "label")) {
    const value = getAttr(label.tag, "for");
    if (value) result.add(value);
  }
  return result;
}

function checkHtmlFile(file) {
  const text = read(file);
  const ids = collectIds(text);

  if (/<html\b[^>]*\slang\s*=\s*["']pl["']/i.test(text)) pass(`${file} html lang="pl"`);
  else fail(file, text, 0, `html lang="pl" is missing`);

  if (/<main\b/i.test(text)) pass(`${file} has main`);
  else fail(file, text, 0, "main element is missing");

  const h1Count = tags(text, "h1").length;
  if (h1Count === 1) pass(`${file} has exactly one h1`);
  else fail(file, text, 0, `expected exactly one h1, found ${h1Count}`);

  for (const image of tags(text, "img")) {
    if (hasAttr(image.tag, "alt")) pass(`${location(file, text, image.index)} img has alt`);
    else fail(file, text, image.index, "img is missing alt");
  }

  for (const anchor of tags(text, "a")) {
    if (hasAccessibleNameForLink(text, anchor)) pass(`${location(file, text, anchor.index)} link has accessible name`);
    else fail(file, text, anchor.index, "link has no accessible name");
  }

  const jsVoid = text.search(/javascript:void\s*\(\s*0\s*\)/i);
  if (jsVoid === -1) pass(`${file} has no javascript:void(0)`);
  else fail(file, text, jsVoid, "javascript:void(0) is not allowed");

  for (const tagInfo of allStartTags(text)) {
    const inlineHandler = tagInfo.tag.match(/\son[a-z]+\s*=/i);
    if (inlineHandler) fail(file, text, tagInfo.index, `inline event handler is not allowed: ${inlineHandler[0].trim()}`);
  }
  if (!/<[a-z][^>]*\son[a-z]+\s*=/i.test(text)) pass(`${file} has no inline event handlers`);

  for (const tagInfo of allStartTags(text)) {
    const controls = getAttr(tagInfo.tag, "aria-controls");
    if (!controls) continue;
    for (const id of controls.split(/\s+/).filter(Boolean)) {
      if (ids.has(id)) pass(`${location(file, text, tagInfo.index)} aria-controls target exists: ${id}`);
      else fail(file, text, tagInfo.index, `aria-controls points to missing id: ${id}`);
    }
  }

  for (const tagInfo of allStartTags(text)) {
    if (!hasAttr(tagInfo.tag, "data-disclosure-toggle")) continue;
    if (!hasAttr(tagInfo.tag, "aria-expanded")) fail(file, text, tagInfo.index, "data-disclosure-toggle is missing aria-expanded");
    if (!hasAttr(tagInfo.tag, "aria-controls")) fail(file, text, tagInfo.index, "data-disclosure-toggle is missing aria-controls");
  }

  for (const tagInfo of allStartTags(text)) {
    if ((getAttr(tagInfo.tag, "role") || "").toLowerCase() !== "button") continue;
    if (getAttr(tagInfo.tag, "tabindex") === "0") pass(`${location(file, text, tagInfo.index)} role=button has tabindex=0`);
    else fail(file, text, tagInfo.index, `role="button" must have tabindex="0"`);

    const classAndId = `${getAttr(tagInfo.tag, "class") || ""} ${getAttr(tagInfo.tag, "id") || ""}`;
    if (/(accordion|toggle|card|header)/i.test(classAndId)) {
      if (hasAttr(tagInfo.tag, "aria-expanded")) pass(`${location(file, text, tagInfo.index)} toggle role=button has aria-expanded`);
      else fail(file, text, tagInfo.index, `toggle-like role="button" must have aria-expanded`);
    }
  }

  const labelForSet = labelsFor(text);
  for (const tagName of ["input", "select", "textarea"]) {
    for (const control of tags(text, tagName)) {
      if (isControlledHoneypot(control.tag)) {
        pass(`${location(file, text, control.index)} ${tagName} is controlled honeypot and is exempt from label requirement`);
      } else if (looksLikeHoneypot(control.tag)) {
        fail(file, text, control.index, `${tagName} honeypot must have aria-hidden="true", tabindex="-1" and autocomplete="off"`);
      } else if (hasFormControlLabel(text, control, labelForSet)) pass(`${location(file, text, control.index)} ${tagName} has label`);
      else fail(file, text, control.index, `${tagName} is missing label, aria-label or aria-labelledby`);
    }
  }

  if (/<meta\b[^>]*name\s*=\s*["']robots["'][^>]*content\s*=\s*["'][^"']*noindex\s*,\s*nofollow[^"']*["']/i.test(text)) {
    pass(`${file} keeps noindex,nofollow`);
  } else {
    fail(file, text, 0, `${file} must keep noindex,nofollow while staging`);
  }
}

for (const file of htmlFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`FAIL ${file}: file is missing`);
    continue;
  }
  checkHtmlFile(file);
}

if (!fs.existsSync("robots.txt")) {
  failures.push("FAIL robots.txt: file is missing");
} else {
  const robots = read("robots.txt");
  if (/Disallow:\s*\//.test(robots)) pass("robots.txt contains Disallow: /");
  else failures.push("FAIL robots.txt: missing Disallow: /");
}

const scriptPath = path.join("assets", "js", "script.js");
if (!fs.existsSync(scriptPath)) {
  failures.push("FAIL assets/js/script.js: file is missing");
} else {
  const script = read(scriptPath);
  const innerHtmlAssignment = script.search(/(?:^|[^\w$])innerHTML\s*=/m);
  if (innerHtmlAssignment === -1) pass("assets/js/script.js has no innerHTML assignment");
  else fail(scriptPath, script, innerHtmlAssignment, "innerHTML assignment is not allowed");
}

for (const message of passes) console.log(message);

if (failures.length > 0) {
  for (const message of failures) console.error(message);
  console.error(`FAIL wcag-static-check: ${failures.length} issue(s) found`);
  process.exit(1);
}

console.log("PASS wcag-static-check: no static accessibility regressions found");
