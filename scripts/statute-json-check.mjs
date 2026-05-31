import crypto from "node:crypto";
import fs from "node:fs";

const STATUTE_PATH = "governance/legal/statut.json";
const EVOTING_PATH = "governance/legal/EVOTING_CONCEPT_v0_1.md";
const SOURCE_DOCX = "assets/docs/RC_Silesia_Statut_Final.docx";

const REQUIRED_TOP_LEVEL_KEYS = [
  "_status",
  "statute_id",
  "organization_id",
  "title",
  "version",
  "status",
  "source_document",
  "source_document_sha256",
  "source_document_size_bytes",
  "generated_at",
  "reference_prefix",
  "articles",
  "paragraphs",
  "units",
  "organs",
  "competences",
  "representation",
  "resolution_rules",
  "membership",
  "fees",
  "assets",
  "electronic_communication",
  "amendment",
  "dissolution"
];

const REQUIRED_UNIT_KEYS = [
  "id",
  "canonical_ref",
  "label",
  "type",
  "text",
  "children",
  "parent_id",
  "article_id",
  "paragraph_id",
  "source_order",
  "effective_from"
];

const REQUIRED_REFS = [
  "statut:par_9_ust_1",
  "statut:par_10",
  "statut:par_18",
  "statut:par_18_ust_19",
  "statut:par_18_ust_20",
  "statut:par_19",
  "statut:par_20",
  "statut:par_33",
  "statut:par_33_ust_1",
  "statut:par_33_ust_2",
  "statut:par_33_ballot_by_mailing"
];

const REQUIRED_TEXT_FRAGMENTS = [
  "Rotary Klub Silesia",
  "Siedzibą Klubu jest miasto Mikołów",
  "Członek czynny Klubu ma status",
  "Walne Zgromadzenie Członków jest najwyższą władzą Klubu",
  "Uchwały Walnego Zgromadzenia Członków zapadają zwykłą większością głosów",
  "Zmiana Statutu wymaga bezwzględnej większości głosów",
  "Do składania w imieniu Klubu oświadczeń woli",
  "Zebrania Klubu, posiedzenia Zarządu",
  "ballot-by-mailing"
];

const MOJIBAKE_PATTERNS = [
  /Â§/,
  /ArtykuĹ/,
  /OgĂ/,
  /Ĺ‚/,
  /Ĺ›/,
  /Ä…/,
  /Ä™/,
  /Ăł/,
  /Â[^\n]/
];

let failures = 0;
let warnings = 0;

function pass(message) {
  console.log(`PASS ${message}`);
}

function warning(message) {
  warnings += 1;
  console.warn(`WARNING ${message}`);
}

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function assert(condition, message) {
  if (condition) {
    pass(message);
  } else {
    fail(message);
  }
}

function readUtf8(path) {
  const bytes = fs.readFileSync(path);
  const hasBom = bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf;
  const text = bytes.toString("utf8");
  assert(!hasBom, `${path}: UTF-8 without BOM`);
  assert(!text.includes("\r\n"), `${path}: LF line endings`);
  return { bytes, text };
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function extractStatuteRefs(text) {
  return [...text.matchAll(/`(statut:[a-z0-9_:-]+)`/gi)].map((match) => match[1]);
}

assert(fs.existsSync(STATUTE_PATH), `${STATUTE_PATH}: exists`);
assert(fs.existsSync(EVOTING_PATH), `${EVOTING_PATH}: exists`);
assert(fs.existsSync(SOURCE_DOCX), `${SOURCE_DOCX}: exists`);

const statuteFile = readUtf8(STATUTE_PATH);
const evotingFile = readUtf8(EVOTING_PATH);
const statute = JSON.parse(statuteFile.text);
pass(`${STATUTE_PATH}: JSON parses`);

for (const key of REQUIRED_TOP_LEVEL_KEYS) {
  assert(hasOwn(statute, key), `${STATUTE_PATH}: top-level key exists: ${key}`);
}

assert(statute.source_document === SOURCE_DOCX, `${STATUTE_PATH}: source_document points to DOCX`);

const sourceBytes = fs.readFileSync(SOURCE_DOCX);
const sourceHash = crypto.createHash("sha256").update(sourceBytes).digest("hex");
assert(statute.source_document_sha256 === sourceHash, `${STATUTE_PATH}: source_document_sha256 matches DOCX`);
assert(statute.source_document_size_bytes === sourceBytes.length, `${STATUTE_PATH}: source_document_size_bytes matches DOCX`);

assert(Array.isArray(statute.articles), `${STATUTE_PATH}: articles is an array`);
assert(Array.isArray(statute.paragraphs), `${STATUTE_PATH}: paragraphs is an array`);
assert(Array.isArray(statute.units), `${STATUTE_PATH}: units is an array`);
assert(statute.articles.length === 16, `${STATUTE_PATH}: contains 16 articles`);
assert(statute.paragraphs.length === 33, `${STATUTE_PATH}: contains 33 paragraphs`);
assert(statute.units.length >= 239, `${STATUTE_PATH}: contains at least 239 units`);

const allText = statuteFile.text;
for (const pattern of MOJIBAKE_PATTERNS) {
  assert(!pattern.test(allText), `${STATUTE_PATH}: no mojibake pattern ${pattern}`);
}

assert(allText.includes("§"), `${STATUTE_PATH}: preserves §`);
assert(allText.includes("ą") && allText.includes("ł") && allText.includes("ś"), `${STATUTE_PATH}: preserves Polish characters`);

for (const fragment of REQUIRED_TEXT_FRAGMENTS) {
  assert(allText.includes(fragment), `${STATUTE_PATH}: contains required text fragment: ${fragment}`);
}

const refToUnit = new Map();
const idToUnit = new Map();
const duplicateRefs = new Set();
const duplicateIds = new Set();
for (const unit of statute.units) {
  if (idToUnit.has(unit.id)) duplicateIds.add(unit.id);
  idToUnit.set(unit.id, unit);
  if (refToUnit.has(unit.canonical_ref)) duplicateRefs.add(unit.canonical_ref);
  refToUnit.set(unit.canonical_ref, unit);
}

assert(duplicateIds.size === 0, `${STATUTE_PATH}: unit ids are unique`);
assert(duplicateRefs.size === 0, `${STATUTE_PATH}: canonical_ref values are unique`);

let unitStructuralIssues = 0;
for (const unit of statute.units) {
  for (const key of REQUIRED_UNIT_KEYS) {
    if (!hasOwn(unit, key)) {
      unitStructuralIssues += 1;
      fail(`${unit.id}: unit key missing: ${key}`);
    }
  }
  if (unit.canonical_ref !== `${statute.reference_prefix}${unit.id}`) {
    unitStructuralIssues += 1;
    fail(`${unit.id}: canonical_ref does not match reference_prefix + id`);
  }
  if (!(typeof unit.text === "string" && unit.text.trim().length > 0)) {
    unitStructuralIssues += 1;
    fail(`${unit.id}: text is empty`);
  }
  if (!Array.isArray(unit.children)) {
    unitStructuralIssues += 1;
    fail(`${unit.id}: children is not an array`);
  }
  if (!Number.isInteger(unit.source_order)) {
    unitStructuralIssues += 1;
    fail(`${unit.id}: source_order is not an integer`);
  }
}
assert(unitStructuralIssues === 0, `${STATUTE_PATH}: all ${statute.units.length} units have required structure`);

const paragraphRefs = new Set(statute.paragraphs.map((paragraph) => paragraph.canonical_ref));
let articleRefIssues = 0;
for (const article of statute.articles) {
  if (!Array.isArray(article.paragraph_refs)) {
    articleRefIssues += 1;
    fail(`${article.id}: paragraph_refs is not an array`);
    continue;
  }
  for (const paragraphRef of article.paragraph_refs) {
    if (!paragraphRefs.has(paragraphRef)) {
      articleRefIssues += 1;
      fail(`${article.id}: paragraph_ref missing: ${paragraphRef}`);
    }
  }
}
assert(articleRefIssues === 0, `${STATUTE_PATH}: article paragraph_refs point to existing paragraphs`);

let hierarchyIssues = 0;
for (const paragraph of statute.paragraphs) {
  if (!refToUnit.has(paragraph.canonical_ref)) {
    hierarchyIssues += 1;
    fail(`${paragraph.id}: paragraph missing from units`);
  }
  for (const childId of paragraph.children) {
    const child = idToUnit.get(childId);
    if (!child) {
      hierarchyIssues += 1;
      fail(`${paragraph.id}: child unit missing: ${childId}`);
      continue;
    }
    if (child) {
      if (child.parent_id !== paragraph.id) {
        hierarchyIssues += 1;
        fail(`${child.id}: parent_id does not point to ${paragraph.id}`);
      }
      if (child.paragraph_id !== paragraph.id) {
        hierarchyIssues += 1;
        fail(`${child.id}: paragraph_id does not point to ${paragraph.id}`);
      }
      if (child.article_id !== paragraph.article_id) {
        hierarchyIssues += 1;
        fail(`${child.id}: article_id does not match parent paragraph`);
      }
    }
  }
}
assert(hierarchyIssues === 0, `${STATUTE_PATH}: paragraph child hierarchy is consistent`);

for (const ref of REQUIRED_REFS) {
  assert(refToUnit.has(ref), `${STATUTE_PATH}: required ref exists: ${ref}`);
}

const ballot = refToUnit.get("statut:par_33_ballot_by_mailing");
assert(Boolean(ballot), "statut:par_33_ballot_by_mailing: exists");
if (ballot) {
  assert(ballot.parent_id === "par_33", "statut:par_33_ballot_by_mailing: parent is par_33");
  assert(ballot.text.includes("ballot-by-mailing"), "statut:par_33_ballot_by_mailing: text contains ballot-by-mailing");
  if (ballot.type !== "derived_concept") {
    warning("statut:par_33_ballot_by_mailing is not marked as derived_concept");
  } else {
    pass("statut:par_33_ballot_by_mailing: marked as derived_concept");
  }
}

const evotingRefs = extractStatuteRefs(evotingFile.text);
const missingEvotingRefs = [...new Set(evotingRefs)].filter((ref) => !refToUnit.has(ref));
assert(missingEvotingRefs.length === 0, `${EVOTING_PATH}: all statute refs exist in statut.json`);
if (missingEvotingRefs.length) {
  for (const ref of missingEvotingRefs) {
    fail(`${EVOTING_PATH}: missing statute ref: ${ref}`);
  }
}

if (!statute.note.includes("interpretacja statutu wymaga weryfikacji prawnej")) {
  warning(`${STATUTE_PATH}: note should state that legal interpretation requires verification`);
} else {
  pass(`${STATUTE_PATH}: note keeps legal-verification caveat`);
}

console.log(`INFO ${STATUTE_PATH}: articles=${statute.articles.length}, paragraphs=${statute.paragraphs.length}, units=${statute.units.length}`);
console.log(`INFO ${SOURCE_DOCX}: sha256=${sourceHash}, size=${sourceBytes.length}`);

if (failures > 0) {
  console.error(`FAIL statute-json-check: ${failures} failure(s), ${warnings} warning(s)`);
  process.exit(1);
}

console.log(`PASS statute-json-check: no integrity regressions found (${warnings} warning(s))`);
