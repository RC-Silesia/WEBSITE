import fs from "node:fs";
import path from "node:path";

const REQUIRED_FILES = [
  "governance/public/PUBLIC_POLICY_INDEX.md",
  "governance/public/POLICY_REPOSITORY_RULES_v0_1.md",
  "governance/legal/POLICY_METADATA_SCHEMA_DRAFT_v0_1.json",
  "governance/legal/RESOLUTION_METADATA_SCHEMA_DRAFT_v0_1.json",
  "governance/legal/COMPLIANCE_FINDING_SCHEMA_DRAFT_v0_1.json"
];

const SCHEMA_FILES = REQUIRED_FILES.filter((file) => file.endsWith(".json"));
const REQUIRED_SCHEMA_KEYS = ["schema_id", "title", "status", "description", "required_fields", "fields"];
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

const FINAL_STATUSES = new Set(["adopted", "published"]);
const DRAFT_STATUS_PATTERNS = [
  /\bdraft\b/i,
  /\bunder_review\b/i,
  /w przygotowaniu/i,
  /projekt/i,
  /wzorzec docelowy/i,
  /do zatwierdzenia/i,
  /do przyjęcia/i
];

let failures = 0;

function pass(message) {
  console.log(`PASS ${message}`);
}

function info(message) {
  console.log(`INFO ${message}`);
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

function isPlaceholder(value) {
  return /do uzupełnienia|do określenia|do przyjęcia|\[.+?\]/i.test(String(value || ""));
}

function statusIsFinal(status) {
  const normalized = String(status || "").trim().toLowerCase();
  if (FINAL_STATUSES.has(normalized)) return true;
  return /\b(adopted|published)\b/i.test(normalized);
}

function statusIsDraftLike(status) {
  return DRAFT_STATUS_PATTERNS.some((pattern) => pattern.test(String(status || "")));
}

function hasAdoptionPlaceholder(status, resolution) {
  return /\[UCHWAŁA_NR\]|\[UCHWAŁA_DATA\]/.test(`${status} ${resolution}`);
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

function checkRequiredFiles() {
  for (const file of REQUIRED_FILES) {
    if (exists(file)) {
      pass(`${file}: exists`);
    } else {
      fail(`${file}: missing required governance file`);
    }
  }
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
    /(publik\w*|opublik\w*)\s+[^.\n|]*(rejestr\w* dostępu|rejestr\w* dostępów)/i
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

function checkRows(rows, sourcePath) {
  for (const row of rows) {
    const id = row["ID dokumentu"] || `line ${row.line}`;
    const status = row["Status"];
    const visibility = row["Widoczność"];
    const version = row["Wersja"];
    const adoptedBy = row["Organ przyjmujący"];
    const resolution = row["Powiązana uchwała"];
    const review = row["Planowany przegląd"];

    if (isBlank(status)) {
      fail(`${sourcePath}:${row.line} ${id}: missing status`);
    } else {
      pass(`${sourcePath}:${row.line} ${id}: status present`);
    }

    if (/publiczn|public|opublik/i.test(visibility || "") && /private_governance/i.test(visibility || "")) {
      fail(`${sourcePath}:${row.line} ${id}: public document cannot have private_governance visibility`);
    }

    if (statusIsFinal(status)) {
      if (isBlank(version) || isPlaceholder(version)) {
        fail(`${sourcePath}:${row.line} ${id}: final document requires concrete version`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: final document has version`);
      }

      if (isBlank(adoptedBy) || isPlaceholder(adoptedBy)) {
        fail(`${sourcePath}:${row.line} ${id}: final document requires adopting organ`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: final document has adopting organ`);
      }

      if (isBlank(resolution) || isPlaceholder(resolution)) {
        if (hasAdoptionPlaceholder(status, resolution)) {
          info(`${sourcePath}:${row.line} ${id}: final status uses explicit resolution placeholders`);
        } else {
          fail(`${sourcePath}:${row.line} ${id}: final document requires resolution or explicit adoption placeholder`);
        }
      } else {
        pass(`${sourcePath}:${row.line} ${id}: final document has resolution reference`);
      }

      if (isBlank(visibility)) {
        fail(`${sourcePath}:${row.line} ${id}: final document requires visibility`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: final document has visibility`);
      }

      if (isBlank(review) || isPlaceholder(review)) {
        fail(`${sourcePath}:${row.line} ${id}: final document requires planned review or review cycle`);
      } else {
        pass(`${sourcePath}:${row.line} ${id}: final document has planned review`);
      }
    } else if (statusIsDraftLike(status)) {
      pass(`${sourcePath}:${row.line} ${id}: draft/review document does not require final resolution`);
    }
  }
}

function main() {
  checkRequiredFiles();
  checkSchemas();

  const indexPath = "governance/public/PUBLIC_POLICY_INDEX.md";
  if (exists(indexPath)) {
    const markdown = readText(indexPath);
    const rows = parseMarkdownTable(markdown, indexPath);
    checkPrivatePublicationText(markdown, indexPath);
    checkRows(rows, indexPath);
  }

  if (failures > 0) {
    console.error(`FAIL governance-metadata-check: ${failures} issue(s) found`);
    process.exit(1);
  }

  console.log("PASS governance-metadata-check: no metadata regressions found");
}

main();
