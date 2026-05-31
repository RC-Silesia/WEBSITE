import fs from "node:fs";

const REQUIRED_FILES = [
  "governance/public/PUBLIC_POLICY_INDEX.md",
  "governance/public/public_policy_index.json",
  "governance/public/POLICY_REPOSITORY_RULES_v0_1.md",
  "governance/legal/POLICY_METADATA_SCHEMA_DRAFT_v0_1.json",
  "governance/legal/RESOLUTION_METADATA_SCHEMA_DRAFT_v0_1.json",
  "governance/legal/COMPLIANCE_FINDING_SCHEMA_DRAFT_v0_1.json"
];

const PUBLIC_POLICY_JSON = "governance/public/public_policy_index.json";
const SCHEMA_FILES = REQUIRED_FILES.filter((file) => file.endsWith(".json") && file !== PUBLIC_POLICY_JSON);
const REQUIRED_SCHEMA_KEYS = ["schema_id", "title", "status", "description", "required_fields", "fields"];
const REQUIRED_PUBLIC_INDEX_KEYS = ["index_id", "organization_id", "status", "version", "documents"];
const REQUIRED_PUBLIC_DOCUMENT_KEYS = [
  "document_id",
  "title",
  "category",
  "type",
  "status",
  "version",
  "adopted_by",
  "resolution_ref",
  "statute_refs",
  "visibility",
  "planned_review",
  "notes"
];
const REQUIRED_INDEX_COLUMNS = [
  "ID dokumentu",
  "Tytuł",
  "Kategoria",
  "Typ dokumentu",
  "Status",
  "Wersja",
  "Organ przyjmujący",
  "Powiązana uchwała",
  "Odwołania do statutu",
  "Widoczność",
  "Planowany przegląd",
  "Uwagi"
];

const LIFECYCLE_STATUSES = [
  "required_for_operation",
  "draft",
  "under_review",
  "board_approval_required",
  "adopted_pending_metadata",
  "adopted",
  "published",
  "superseded",
  "archived"
];

const MINIMAL_SITE_PACKAGE_IDS = new Set([
  "NGOS-START-001",
  "NGOS-RESP-001",
  "NGOS-PUB-001",
  "RODO-PRIV-001",
  "WCAG-POL-001",
  "WCAG-GATE-001",
  "WCAG-REG-001"
]);

let failures = 0;
let warnings = 0;

function pass(message) {
  console.log(`PASS ${message}`);
}

function info(message) {
  console.log(`INFO ${message}`);
}

function warning(message) {
  warnings += 1;
  console.warn(`WARNING ${message}`);
}

function fail(message) {
  failures += 1;
  console.error(`FAIL ${message}`);
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function exists(filePath) {
  return fs.existsSync(filePath);
}

function isBlank(value) {
  return !String(value || "").trim();
}

function isGenericPlaceholder(value) {
  return /do uzupełnienia|do określenia|tbd|to be added/i.test(String(value || ""));
}

function hasAdoptionPlaceholder(value) {
  return /\[UCHWAŁA_NR\]|\[UCHWAŁA_DATA\]/.test(String(value || ""));
}

function declaresAdoption(status) {
  const text = String(status || "");
  const positive = /przyjęt|adopted|published/i.test(text);
  const negative = /projekt|do przyjęci|draft|w przygotowaniu|under_review|board_approval_required/i.test(text);
  return positive && !negative;
}

function isDraftLike(status) {
  return /draft|under_review|board_approval_required|projekt|do przyjęci|w przygotowaniu|do zatwierdzenia|wzorzec docelowy/i.test(
    String(status || "")
  );
}

function isAdoptedPendingMetadata(status) {
  return /adopted_pending_metadata|przyjęt[ay].*(metadan|do uzupełnienia|placeholder|\[UCHWAŁA_)/i.test(String(status || ""));
}

function isFinalStatus(status) {
  return /(^|\s)(adopted|published)(\s|$)|przyjęt/i.test(String(status || "")) && !isDraftLike(status);
}

function isProductionMode() {
  if (process.env.NGOS_ENV === "production") return true;
  if (exists(".ngos-production")) return true;
  return false;
}

function detectEnvironment() {
  if (isProductionMode()) return "production";
  const robots = exists("robots.txt") ? readText("robots.txt") : "";
  if (/Disallow:\s*\//i.test(robots)) return "staging";
  return "staging";
}

function parseMarkdownTable(markdown, sourcePath) {
  const lines = markdown.split(/\r?\n/);
  const headerIndex = lines.findIndex((line) =>
    line.trim().startsWith("|") && REQUIRED_INDEX_COLUMNS.every((column) => line.includes(column))
  );

  if (headerIndex === -1) {
    fail(`${sourcePath}: metadata table header with required columns not found`);
    return [];
  }

  pass(`${sourcePath}: metadata table header found`);
  const headers = lines[headerIndex]
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());

  for (const column of REQUIRED_INDEX_COLUMNS) {
    if (!headers.includes(column)) {
      fail(`${sourcePath}: missing metadata column "${column}"`);
    } else {
      pass(`${sourcePath}: metadata column exists: ${column}`);
    }
  }

  const rows = [];
  for (let i = headerIndex + 2; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line || !line.trim().startsWith("|")) break;
    const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
    if (cells.length !== headers.length) {
      fail(`${sourcePath}:${i + 1}: table row has ${cells.length} cells, expected ${headers.length}`);
      continue;
    }
    const row = { line: i + 1 };
    headers.forEach((header, index) => {
      row[header] = cells[index];
    });
    rows.push(row);
  }

  pass(`${sourcePath}: parsed ${rows.length} metadata rows`);
  return rows;
}

function normalizeMarkdownRow(row) {
  return {
    line: row.line,
    document_id: row["ID dokumentu"],
    title: row["Tytuł"],
    category: row["Kategoria"],
    type: row["Typ dokumentu"],
    status: row["Status"],
    version: row["Wersja"],
    adopted_by: row["Organ przyjmujący"],
    resolution_ref: row["Powiązana uchwała"],
    statute_refs: row["Odwołania do statutu"] ? [row["Odwołania do statutu"]] : [],
    visibility: row["Widoczność"],
    planned_review: row["Planowany przegląd"],
    notes: row["Uwagi"]
  };
}

function checkRequiredFiles() {
  for (const file of REQUIRED_FILES) {
    if (exists(file)) {
      pass(`${file}: exists`);
    } else {
      fail(`${file}: missing required governance file`);
    }
  }
}

function checkPublicPolicyJson() {
  if (!exists(PUBLIC_POLICY_JSON)) return { documents: [] };
  let index;
  try {
    index = JSON.parse(readText(PUBLIC_POLICY_JSON));
    pass(`${PUBLIC_POLICY_JSON}: JSON parses`);
  } catch (error) {
    fail(`${PUBLIC_POLICY_JSON}: invalid JSON: ${error.message}`);
    return { documents: [] };
  }

  for (const key of REQUIRED_PUBLIC_INDEX_KEYS) {
    if (Object.prototype.hasOwnProperty.call(index, key)) {
      pass(`${PUBLIC_POLICY_JSON}: index key exists: ${key}`);
    } else {
      fail(`${PUBLIC_POLICY_JSON}: missing index key: ${key}`);
    }
  }

  if (!Array.isArray(index.documents) || index.documents.length === 0) {
    fail(`${PUBLIC_POLICY_JSON}: documents must be a non-empty array`);
    return { documents: [] };
  }

  pass(`${PUBLIC_POLICY_JSON}: parsed ${index.documents.length} document records`);
  const seen = new Set();
  for (let i = 0; i < index.documents.length; i += 1) {
    const document = index.documents[i];
    const location = `${PUBLIC_POLICY_JSON}:documents[${i}]`;
    if (!document || typeof document !== "object" || Array.isArray(document)) {
      fail(`${location}: document must be an object`);
      continue;
    }
    for (const key of REQUIRED_PUBLIC_DOCUMENT_KEYS) {
      if (Object.prototype.hasOwnProperty.call(document, key)) {
        pass(`${location}: document key exists: ${key}`);
      } else {
        fail(`${location}: missing document key: ${key}`);
      }
    }
    if (isBlank(document.document_id)) {
      fail(`${location}: missing document_id`);
    } else if (seen.has(document.document_id)) {
      fail(`${location}: duplicate document_id ${document.document_id}`);
    } else {
      seen.add(document.document_id);
      pass(`${location}: document_id is unique`);
    }
    if (!Array.isArray(document.statute_refs)) {
      fail(`${location}: statute_refs must be an array`);
    }
  }

  return index;
}

function checkSchemas() {
  for (const file of SCHEMA_FILES) {
    if (!exists(file)) continue;
    let schema;
    try {
      schema = JSON.parse(readText(file));
      pass(`${file}: JSON parses`);
    } catch (error) {
      fail(`${file}: invalid JSON: ${error.message}`);
      continue;
    }

    for (const key of REQUIRED_SCHEMA_KEYS) {
      if (Object.prototype.hasOwnProperty.call(schema, key)) {
        pass(`${file}: schema key exists: ${key}`);
      } else {
        fail(`${file}: missing schema key: ${key}`);
      }
    }

    if (!Array.isArray(schema.required_fields) || schema.required_fields.length === 0) {
      fail(`${file}: required_fields must be a non-empty array`);
    } else {
      pass(`${file}: required_fields is non-empty`);
    }

    if (!schema.fields || typeof schema.fields !== "object" || Array.isArray(schema.fields)) {
      fail(`${file}: fields must be an object`);
    } else {
      pass(`${file}: fields object exists`);
    }
  }
}

function checkPrivatePublicationText(markdown, sourcePath) {
  const blockedVisibility = /private_governance/i;
  if (blockedVisibility.test(markdown)) {
    fail(`${sourcePath}: public index must not use private_governance visibility`);
  } else {
    pass(`${sourcePath}: no private_governance visibility`);
  }

  const riskyPublicationPatterns = [
    /(publik\w*|opublik\w*)\s+[^.\n|]*(threat model|model[ei] zagrożeń)/i,
    /(publik\w*|opublik\w*)\s+[^.\n|]*(sekret|secret|token|klucz)/i,
    /(publik\w*|opublik\w*)\s+[^.\n|]*(dane członków|danych członków)/i,
    /(publik\w*|opublik\w*)\s+[^.\n|]*(macierz\w* dostęp|rejestr\w* dostępu|rejestr\w* dostępów)/i
  ];
  const negatedPublication = /nie\s+(jest\s+)?(publik|opublik)|nie\s+są\s+(publik|opublik)|bez\s+(publik|opublik)/i;

  const lines = markdown.split(/\r?\n/);
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (negatedPublication.test(line)) continue;
    if (riskyPublicationPatterns.some((pattern) => pattern.test(line))) {
      fail(`${sourcePath}:${index + 1}: text appears to suggest publication of private governance/security material`);
      return;
    }
  }
  pass(`${sourcePath}: no text suggesting publication of private threat models, secrets, member data or access registers`);
}

function checkLifecycleVocabulary() {
  info(`lifecycle statuses supported: ${LIFECYCLE_STATUSES.join(", ")}`);
}

function checkIndexConsistency(rows, sourcePath) {
  if (!exists("index.html")) return;
  const html = readText("index.html");
  for (const row of rows) {
    const id = row.document_id;
    const title = row.title;
    const status = row.status;
    if (!id || !title || !declaresAdoption(status)) continue;
    if (html.includes(`<strong>${title}</strong>`)) {
      const titleIndex = html.indexOf(`<strong>${title}</strong>`);
      const nearby = html.slice(titleIndex, titleIndex + 300);
      if (/projekt|do przyjęcia|draft|w przygotowaniu/i.test(nearby)) {
        warning(`${sourcePath}:${row.line} ${id}: index.html may describe adopted document as draft/review`);
      }
    }
  }
}

function checkRows(rows, sourcePath, environment) {
  for (const row of rows) {
    const id = row.document_id || `line ${row.line}`;
    const status = row.status;
    const visibility = row.visibility;
    const version = row.version;
    const adoptedBy = row.adopted_by;
    const resolution = row.resolution_ref;
    const review = row.planned_review;
    const rowText = Object.values(row).join(" ");

    if (isBlank(status)) {
      fail(`${sourcePath}:${row.line} ${id}: missing status`);
    } else {
      pass(`${sourcePath}:${row.line} ${id}: status present`);
    }

    if (/private_governance/i.test(visibility || "")) {
      fail(`${sourcePath}:${row.line} ${id}: public index row cannot use private_governance visibility`);
    }

    if (declaresAdoption(status)) {
      if (isBlank(resolution) || isGenericPlaceholder(resolution)) {
        if (hasAdoptionPlaceholder(`${status} ${resolution}`)) {
          info(`${sourcePath}:${row.line} ${id}: document declares adoption and uses explicit resolution placeholders`);
        } else {
          fail(`${sourcePath}:${row.line} ${id}: dokument deklaruje przyjęcie, ale nie ma powiązanej uchwały ani placeholdera`);
        }
      } else {
        pass(`${sourcePath}:${row.line} ${id}: adopted/published document has resolution reference or placeholder`);
      }
    }

    if (isAdoptedPendingMetadata(status)) {
      warning(`${sourcePath}:${row.line} ${id}: adopted_pending_metadata requires later resolution metadata completion`);
    }

    if (isFinalStatus(status)) {
      if (isBlank(version) || isGenericPlaceholder(version)) {
        fail(`${sourcePath}:${row.line} ${id}: adopted/published document requires concrete version`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: adopted/published document has version`);
      }

      if (isBlank(adoptedBy) || isGenericPlaceholder(adoptedBy)) {
        fail(`${sourcePath}:${row.line} ${id}: adopted/published document requires adopting organ`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: adopted/published document has adopting organ`);
      }

      if (isBlank(visibility)) {
        fail(`${sourcePath}:${row.line} ${id}: adopted/published document requires visibility`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: adopted/published document has visibility`);
      }
    } else if (isDraftLike(status) || /required_for_operation/i.test(rowText)) {
      info(`${sourcePath}:${row.line} ${id}: draft/review/required document does not require final resolution in staging`);
    }

    if (isBlank(review) || isGenericPlaceholder(review)) {
      warning(`${sourcePath}:${row.line} ${id}: public document has no concrete planned review date or review cycle`);
    }

    if (environment === "production" && MINIMAL_SITE_PACKAGE_IDS.has(id)) {
      if (isDraftLike(status) || /required_for_operation|adopted_pending_metadata/i.test(status)) {
        fail(`${sourcePath}:${row.line} ${id}: production mode requires minimal site package document to be adopted or published`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: production mode minimal package status is acceptable`);
      }
    }
  }
}

function compareJsonAndMarkdown(jsonDocuments, markdownRows) {
  const markdownById = new Map(markdownRows.map((row) => [row.document_id, row]));
  const jsonById = new Map(jsonDocuments.map((document) => [document.document_id, document]));

  for (const markdownRow of markdownRows) {
    if (!jsonById.has(markdownRow.document_id)) {
      fail(`${PUBLIC_POLICY_JSON}: missing document_id from Markdown: ${markdownRow.document_id}`);
    } else {
      pass(`${PUBLIC_POLICY_JSON}: contains Markdown document_id ${markdownRow.document_id}`);
    }
  }

  for (const jsonDocument of jsonDocuments) {
    if (!markdownById.has(jsonDocument.document_id)) {
      fail(`governance/public/PUBLIC_POLICY_INDEX.md: missing JSON document_id ${jsonDocument.document_id}`);
      continue;
    }
    const markdownRow = markdownById.get(jsonDocument.document_id);
    for (const key of ["title", "category", "status"]) {
      if (String(jsonDocument[key] || "") !== String(markdownRow[key] || "")) {
        fail(`${jsonDocument.document_id}: ${key} differs between JSON and Markdown`);
      } else {
        pass(`${jsonDocument.document_id}: ${key} matches JSON and Markdown`);
      }
    }
  }
}

function main() {
  const environment = detectEnvironment();
  info(`environment: ${environment}; set NGOS_ENV=production or create .ngos-production to enforce production gate`);
  checkLifecycleVocabulary();
  checkRequiredFiles();
  const publicIndex = checkPublicPolicyJson();
  checkSchemas();

  const indexPath = "governance/public/PUBLIC_POLICY_INDEX.md";
  if (exists(indexPath)) {
    const markdown = readText(indexPath);
    const rows = parseMarkdownTable(markdown, indexPath).map(normalizeMarkdownRow);
    checkPrivatePublicationText(markdown, indexPath);
    if (publicIndex.documents.length > 0) {
      checkPrivatePublicationText(JSON.stringify(publicIndex, null, 2), PUBLIC_POLICY_JSON);
      compareJsonAndMarkdown(publicIndex.documents, rows);
      checkRows(publicIndex.documents.map((document, index) => ({ ...document, line: `json:${index}` })), PUBLIC_POLICY_JSON, environment);
    }
    checkRows(rows, indexPath, environment);
    checkIndexConsistency(rows, indexPath);
  }

  if (failures > 0) {
    console.error(`FAIL governance-metadata-check: ${failures} issue(s) found, ${warnings} warning(s)`);
    process.exit(1);
  }

  console.log(`PASS governance-metadata-check: no metadata regressions found (${warnings} warning(s))`);
}

main();
