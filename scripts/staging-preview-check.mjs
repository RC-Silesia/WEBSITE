import fs from "node:fs";
import path from "node:path";

const checks = [];
const failures = [];

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function pass(message) {
  checks.push(`PASS ${message}`);
}

function fail(message) {
  failures.push(`FAIL ${message}`);
}

function requireFile(file) {
  if (fs.existsSync(file)) {
    pass(`${file} exists`);
    return true;
  }
  fail(`${file} is missing`);
  return false;
}

function requireIncludes(file, text, needle, message) {
  if (text.includes(needle)) pass(message || `${file} contains ${needle}`);
  else fail(`${file} missing required text: ${needle}`);
}

function requireMatches(file, text, pattern, message) {
  if (pattern.test(text)) pass(message || `${file} matches ${pattern}`);
  else fail(`${file} missing required pattern: ${pattern}`);
}

function requireNotMatches(file, text, pattern, message) {
  if (!pattern.test(text)) pass(message || `${file} does not match ${pattern}`);
  else fail(`${file} contains forbidden pattern: ${pattern}`);
}

function listExistingFiles(files) {
  return files.filter((file) => fs.existsSync(file));
}

function listFilesInDirectory(directory, extensionPattern) {
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && extensionPattern.test(entry.name))
    .map((entry) => path.join(directory, entry.name));
}

function unique(values) {
  return [...new Set(values)];
}

function findPatternMatches(text, pattern) {
  const matches = [];
  for (const match of text.matchAll(pattern)) matches.push(match[0]);
  return unique(matches);
}

function scanStagingForPiiAndSecrets(files) {
  const allowedEmails = new Set(["silesia@rotary.org.pl"]);
  const findings = [];
  const secretPatterns = [
    ["secret/service-role marker", /\b(?:SUPABASE_SERVICE_ROLE_KEY|service_role|P24_CRC|P24_API_KEY|PAYMENT_WEBHOOK_RPC_BEARER_TOKEN)\b/gi],
    ["jwt-like token", /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/g],
    ["private endpoint marker", /\/workbench\b|localhost\b|127\.0\.0\.1\b|0\.0\.0\.0\b|\[?::1\]?/gi],
    ["internal api path", /\/api\/(?:admin|internal|payments|workbench)\b/gi]
  ];

  for (const file of files) {
    const text = read(file);
    for (const value of findPatternMatches(text, /\b\d{11}\b/g)) {
      findings.push(`${file}: PESEL-like value ${value}`);
    }

    for (const value of findPatternMatches(text, /\b[\w.+-]+@[\w-]+(?:\.[\w-]+)+\b/gi)) {
      const normalized = value.toLowerCase();
      if (!allowedEmails.has(normalized)) findings.push(`${file}: non-allowlisted email ${value}`);
    }

    for (const [label, pattern] of secretPatterns) {
      for (const value of findPatternMatches(text, pattern)) {
        findings.push(`${file}: ${label} ${value}`);
      }
    }
  }

  if (findings.length) {
    for (const finding of findings) fail(`staging PII/secret scan MATCHES_BLOCKING: ${finding}`);
  } else {
    pass(`staging PII/secret scan NO_MATCHES across ${files.length} file(s)`);
  }
}

const stagingFile = "staging/index.html";
const publicFile = "index.html";
const previewCssFile = "assets/css/staging-preview.css";
const checklistFile = "docs/RC_SILESIA_FRONTEND_ASSETS_CONSENTS_CHECKLIST.md";
const stagingNotesFile = "STAGING_PREVIEW_NOTES.md";
const stagingChecklistFile = "STAGING_CHECKLIST.md";

for (const file of [stagingFile, publicFile, previewCssFile, checklistFile, stagingNotesFile, stagingChecklistFile]) {
  requireFile(file);
}

if (fs.existsSync(stagingFile)) {
  const html = read(stagingFile);
  requireMatches(stagingFile, html, /<meta\s+name="robots"\s+content="noindex,nofollow,noarchive">/i, "staging keeps noindex,nofollow,noarchive");
  requireIncludes(stagingFile, html, "STAGING_PREVIEW", "staging declares STAGING_PREVIEW");
  requireIncludes(stagingFile, html, "NOT_PRODUCTION_READY", "staging declares NOT_PRODUCTION_READY");
  requireIncludes(stagingFile, html, "../assets/css/staging-preview.css", "staging loads prototype CSS layer");
  requireIncludes(stagingFile, html, 'data-mock-form="true"', "contact form remains mock-only");
  requireIncludes(stagingFile, html, 'data-demo-value="true"', "staging marks demo values structurally");
  requireIncludes(stagingFile, html, "demo value", "staging marks demo values visibly");
  requireIncludes(stagingFile, html, "Kwoty szybkiego wyboru są wartościami demonstracyjnymi", "support demo amounts are explained");
  requireNotMatches(stagingFile, html, /LIVE_P24_SANDBOX_PASS|(?<!NOT_)PRODUCTION_READY|production ready|wdro[zż]eniem produkcyjnym[^.]*gotow/i, "staging does not self-claim production readiness");
}

scanStagingForPiiAndSecrets(
  listExistingFiles([stagingFile, previewCssFile]).concat(listFilesInDirectory("assets/data", /\.json$/i))
);

if (fs.existsSync(publicFile)) {
  const publicHtml = read(publicFile);
  requireNotMatches(publicFile, publicHtml, /staging-preview\.css|STAGING_PREVIEW/i, "public root is not coupled to staging preview layer");
}

if (fs.existsSync(previewCssFile)) {
  const css = read(previewCssFile);
  requireIncludes(previewCssFile, css, "Status: STAGING_PREVIEW only", "prototype CSS labels staging-only status");
  requireMatches(previewCssFile, css, /@media\s*\(max-width:\s*860px\)/, "prototype CSS has tablet/mobile breakpoint");
  requireMatches(previewCssFile, css, /@media\s*\(max-width:\s*560px\)/, "prototype CSS has narrow mobile breakpoint");
}

if (fs.existsSync(checklistFile)) {
  const checklist = read(checklistFile);
  for (const needle of [
    "Status: STAGING_PREVIEW / NOT_PRODUCTION_READY",
    "Asset Checklist",
    "Consent And Governance Checklist",
    "Demo Values In Staging",
    "Lighthouse Performance/Accessibility/Best Practices/SEO when Lighthouse is available"
  ]) {
    requireIncludes(checklistFile, checklist, needle);
  }
}

if (fs.existsSync(stagingNotesFile)) {
  const notes = read(stagingNotesFile);
  requireIncludes(stagingNotesFile, notes, "STAGING_PREVIEW");
  requireIncludes(stagingNotesFile, notes, "NOT_PRODUCTION_READY");
}

if (fs.existsSync(stagingChecklistFile)) {
  const checklist = read(stagingChecklistFile);
  requireIncludes(stagingChecklistFile, checklist, "RC_SILESIA_FRONTEND_ASSETS_CONSENTS_CHECKLIST.md");
  requireIncludes(stagingChecklistFile, checklist, "demo values");
}

const hasLighthouse = Boolean(process.env.LIGHTHOUSE_AVAILABLE === "1" || process.env.LIGHTHOUSE_REPORT_PATH);
if (hasLighthouse) pass("LIGHTHOUSE_CONFIG_PRESENT");
else pass("LIGHTHOUSE_NOT_RUN_TOOL_MISSING");

if (failures.length) {
  console.error(failures.join("\n"));
  console.error(`SUMMARY staging preview checks failed: ${failures.length}`);
  process.exit(1);
}

console.log(checks.join("\n"));
console.log(`SUMMARY staging preview checks passed: ${checks.length}`);
