import fs from "node:fs";

const STATUTE_PATH = "governance/legal/statut.json";
const EVOTING_PATH = "governance/legal/EVOTING_CONCEPT_v0_1.md";
const RESOLUTION_A_PATH = "governance/legal/uchwala-wz-2026-1-korekta-redakcyjna.json";
const RESOLUTION_B_PATH = "governance/legal/uchwala-wz-2026-2-zmiana-dewizy.json";

const REQUIRED_FILES = [
  STATUTE_PATH,
  EVOTING_PATH,
  RESOLUTION_A_PATH,
  RESOLUTION_B_PATH
];

const EXPECTED_ARTICLES = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
  "XIV",
  "XV",
  "XVI"
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

function readJson(path) {
  const file = readUtf8(path);
  try {
    const json = JSON.parse(file.text);
    pass(`${path}: JSON parses`);
    return { file, json };
  } catch (error) {
    fail(`${path}: JSON parses: ${error.message}`);
    return { file, json: null };
  }
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();

  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
    } else {
      seen.add(value);
    }
  }

  return [...duplicates];
}

function flattenParagraphs(statute) {
  return statute.artykuly.flatMap((article) =>
    (article.paragrafy || []).map((paragraph) => ({ ...paragraph, articleNumber: article.numer }))
  );
}

function flattenUnitsFromParagraph(paragraph) {
  const units = [paragraph];

  for (const unit of paragraph.ustepy || []) {
    units.push(unit);
    for (const point of unit.punkty || []) {
      units.push(point);
    }
  }

  for (const point of paragraph.punkty || []) {
    units.push(point);
  }

  return units;
}

function findParagraph(paragraphs, number) {
  return paragraphs.find((paragraph) => paragraph.numer === `§ ${number}`);
}

function assertResolutionDocument(document, path, expectedUri) {
  assert(document.$schema === "https://rc-silesia.github.io/WEBSITE/schemas/document.v1.json", `${path}: document schema URI`);
  assert(document.wersjaSchematu === "1.0.0", `${path}: schema version`);
  assert(document.dokument?.uri === expectedUri, `${path}: stable document URI`);
  assert(document.dokument?.typ === "uchwala", `${path}: type is uchwala`);
  assert(document.dokument?.status === "projekt", `${path}: status is project`);
  assert(Array.isArray(document.dokument?.podstawaPrawna), `${path}: legal basis array`);
  assert(Array.isArray(document.dokument?.powiazania), `${path}: relations array`);
  assert(document.tresc?.typPodzialu === "paragrafy", `${path}: content split by paragraphs`);
  assert(Array.isArray(document.tresc?.paragrafy) && document.tresc.paragrafy.length > 0, `${path}: has content paragraphs`);
}

function main() {
  for (const path of REQUIRED_FILES) {
    assert(fs.existsSync(path), `${path}: exists`);
  }

  const statuteData = readJson(STATUTE_PATH);
  const evotingFile = readUtf8(EVOTING_PATH);
  const resolutionA = readJson(RESOLUTION_A_PATH);
  const resolutionB = readJson(RESOLUTION_B_PATH);
  const statute = statuteData.json;

  if (!statute) {
    process.exit(1);
  }

  assert(statute.$schema === "https://rc-silesia.github.io/WEBSITE/schemas/statut.v1.json", `${STATUTE_PATH}: statute schema URI`);
  assert(statute.wersjaSchematu === "1.0.0", `${STATUTE_PATH}: schema version`);
  assert(hasOwn(statute, "dokument"), `${STATUTE_PATH}: dokument key exists`);
  assert(Array.isArray(statute.artykuly), `${STATUTE_PATH}: artykuly is an array`);
  assert(statute.dokument?.wersja === "1.2", `${STATUTE_PATH}: version is 1.2`);
  assert(statute.dokument?.wersjaPoprzednia === "1.1", `${STATUTE_PATH}: previous version is 1.1`);
  assert(Array.isArray(statute.dokument?.powiazania), `${STATUTE_PATH}: back-relations exist`);

  const relationUris = new Set((statute.dokument.powiazania || []).map((relation) => relation.uri));
  assert(relationUris.has("uchwala:rcs-silesia/wz/2026-XX-XX/1-korekta-redakcyjna"), `${STATUTE_PATH}: links back to resolution A`);
  assert(relationUris.has("uchwala:rcs-silesia/wz/2026-XX-XX/2-zmiana-dewizy"), `${STATUTE_PATH}: links back to resolution B`);
  assert(relationUris.has("statut:rcs-silesia/v1.1"), `${STATUTE_PATH}: links to direct previous statute version`);

  assert(statute.artykuly.length === 16, `${STATUTE_PATH}: contains 16 articles`);
  assert(
    JSON.stringify(statute.artykuly.map((article) => article.numer)) === JSON.stringify(EXPECTED_ARTICLES),
    `${STATUTE_PATH}: articles are numbered I-XVI without duplicate Article VIII`
  );

  const paragraphs = flattenParagraphs(statute);
  assert(paragraphs.length === 33, `${STATUTE_PATH}: contains 33 paragraphs`);
  assert(findDuplicates(paragraphs.map((paragraph) => paragraph.id)).length === 0, `${STATUTE_PATH}: paragraph ids are unique`);
  assert(findDuplicates(paragraphs.map((paragraph) => paragraph.referencja)).length === 0, `${STATUTE_PATH}: paragraph references are unique`);

  const paragraphNumbers = paragraphs.map((paragraph) => Number(String(paragraph.numer).replace(/[^0-9]/g, "")));
  assert(
    paragraphNumbers.every((value, index) => value === index + 1),
    `${STATUTE_PATH}: paragraphs are continuous 1-33`
  );

  const allText = statuteData.file.text;
  assert(allText.includes("Rotary Klub Silesia"), `${STATUTE_PATH}: contains organization name`);
  assert(allText.includes("Służba ponad własny interes"), `${STATUTE_PATH}: contains current motto`);
  assert(allText.includes("Service Above Self"), `${STATUTE_PATH}: contains RI motto source`);

  const par5 = findParagraph(paragraphs, 5);
  assert(Boolean(par5), `${STATUTE_PATH}: § 5 exists`);
  const par5LiveText = JSON.stringify(par5 || {});
  assert(par5LiveText.includes("Służba ponad własny interes"), `${STATUTE_PATH}: § 5 contains current motto`);
  assert(!par5LiveText.includes("Uczynność innym ponad korzyść własną"), `${STATUTE_PATH}: § 5 does not contain old motto as live text`);
  if (statute.dokument.notaWersji?.includes("Uczynność innym ponad korzyść własną")) {
    pass(`${STATUTE_PATH}: old motto appears only in version note context`);
  } else {
    warning(`${STATUTE_PATH}: version note does not mention old motto provenance`);
  }

  const par18 = findParagraph(paragraphs, 18);
  assert(Boolean(par18), `${STATUTE_PATH}: § 18 exists`);
  const par18Text = JSON.stringify(par18 || {});
  assert(par18Text.includes("2/3") || par18Text.includes("dwóch trzecich"), `${STATUTE_PATH}: § 18 contains quorum language`);
  assert(par18Text.includes("bezwzględnej większości"), `${STATUTE_PATH}: § 18 contains absolute majority language`);
  assert(par18Text.includes("Odwołanie Prezydenta"), `${STATUTE_PATH}: § 18 ust. 9 is completed`);

  const par19 = findParagraph(paragraphs, 19);
  assert(Boolean(par19), `${STATUTE_PATH}: § 19 exists`);
  assert(JSON.stringify(par19 || {}).includes("Zarząd"), `${STATUTE_PATH}: § 19 contains board scope`);

  const allUnits = paragraphs.flatMap(flattenUnitsFromParagraph);
  assert(allUnits.some((unit) => unit.referencja === "§ 33 ust. 2"), `${STATUTE_PATH}: § 33 ust. 2 exists`);
  assert(allText.includes("ballot-by-mailing"), `${STATUTE_PATH}: contains ballot-by-mailing source phrase`);

  assertResolutionDocument(
    resolutionA.json,
    RESOLUTION_A_PATH,
    "uchwala:rcs-silesia/wz/2026-XX-XX/1-korekta-redakcyjna"
  );
  assertResolutionDocument(
    resolutionB.json,
    RESOLUTION_B_PATH,
    "uchwala:rcs-silesia/wz/2026-XX-XX/2-zmiana-dewizy"
  );

  const resolutionARelations = new Set((resolutionA.json?.dokument?.powiazania || []).map((relation) => relation.uri));
  const resolutionBRelations = new Set((resolutionB.json?.dokument?.powiazania || []).map((relation) => relation.uri));
  assert(resolutionARelations.has("statut:rcs-silesia/v1.0"), `${RESOLUTION_A_PATH}: changes statute v1.0`);
  assert(resolutionARelations.has("statut:rcs-silesia/v1.1"), `${RESOLUTION_A_PATH}: produces statute v1.1`);
  assert(resolutionBRelations.has("statut:rcs-silesia/v1.1"), `${RESOLUTION_B_PATH}: changes statute v1.1`);
  assert(resolutionBRelations.has("statut:rcs-silesia/v1.2"), `${RESOLUTION_B_PATH}: produces statute v1.2`);

  assert(evotingFile.text.includes("statut:par_33"), `${EVOTING_PATH}: still references electronic communication statute area`);
  console.log(`INFO ${STATUTE_PATH}: articles=${statute.artykuly.length}, paragraphs=${paragraphs.length}, units=${allUnits.length}`);

  if (failures > 0) {
    console.error(`FAIL statute-json-check: ${failures} failure(s), ${warnings} warning(s)`);
    process.exit(1);
  }

  console.log(`PASS statute-json-check: no integrity regressions found (${warnings} warning(s))`);
}

main();
