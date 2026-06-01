import fs from "node:fs";

const LEDGER_PATH = "governance/legal/ai_enablement_readiness_ledger.json";
const REQUIRED_LEDGER_KEYS = ["ledger_id", "organization_id", "status", "version", "scope", "preconditions"];
const REQUIRED_PRECONDITION_KEYS = [
  "id",
  "category",
  "description",
  "status",
  "blocks_ai_enable",
  "evidence_ref",
  "note"
];
const ALLOWED_CATEGORIES = new Set(["architectural_invariant", "governance", "rodo", "security"]);
const ALLOWED_STATUSES = new Set(["not_met", "in_progress", "met", "verified_runtime"]);
const MET_STATUSES = new Set(["met", "verified_runtime"]);

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

function readJson(path) {
  if (!fs.existsSync(path)) {
    fail(`${path}: missing`);
    return null;
  }

  try {
    const text = fs.readFileSync(path, "utf8");
    const hasBom = text.charCodeAt(0) === 0xfeff;
    if (hasBom) fail(`${path}: UTF-8 BOM detected`);
    if (text.includes("\r\n")) fail(`${path}: CRLF line endings detected`);
    return JSON.parse(text);
  } catch (error) {
    fail(`${path}: invalid JSON: ${error.message}`);
    return null;
  }
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function checkLedgerShape(ledger) {
  for (const key of REQUIRED_LEDGER_KEYS) {
    if (hasOwn(ledger, key)) {
      pass(`${LEDGER_PATH}: ledger key exists: ${key}`);
    } else {
      fail(`${LEDGER_PATH}: missing ledger key: ${key}`);
    }
  }

  if (!Array.isArray(ledger.preconditions) || ledger.preconditions.length === 0) {
    fail(`${LEDGER_PATH}: preconditions must be a non-empty array`);
    return [];
  }

  pass(`${LEDGER_PATH}: parsed ${ledger.preconditions.length} preconditions`);
  return ledger.preconditions;
}

function checkPreconditions(preconditions) {
  const seen = new Set();
  const architecturalInvariants = [];
  const governanceItems = [];

  for (let index = 0; index < preconditions.length; index += 1) {
    const item = preconditions[index];
    const location = `${LEDGER_PATH}:preconditions[${index}]`;

    if (!item || typeof item !== "object" || Array.isArray(item)) {
      fail(`${location}: precondition must be an object`);
      continue;
    }

    for (const key of REQUIRED_PRECONDITION_KEYS) {
      if (hasOwn(item, key)) {
        pass(`${location}: key exists: ${key}`);
      } else {
        fail(`${location}: missing key: ${key}`);
      }
    }

    if (typeof item.id !== "string" || item.id.trim() === "") {
      fail(`${location}: id must be a non-empty string`);
    } else if (seen.has(item.id)) {
      fail(`${location}: duplicate id ${item.id}`);
    } else {
      seen.add(item.id);
      pass(`${location}: id is unique`);
    }

    if (!ALLOWED_CATEGORIES.has(item.category)) {
      fail(`${location}: invalid category ${item.category}`);
    }

    if (!ALLOWED_STATUSES.has(item.status)) {
      fail(`${location}: invalid status ${item.status}`);
    }

    if (typeof item.blocks_ai_enable !== "boolean") {
      fail(`${location}: blocks_ai_enable must be boolean`);
    }

    for (const field of ["description", "evidence_ref", "note"]) {
      if (typeof item[field] !== "string" || item[field].trim() === "") {
        fail(`${location}: ${field} must be a non-empty string`);
      }
    }

    if (item.category === "architectural_invariant") {
      architecturalInvariants.push(item);
      if (item.blocks_ai_enable !== true) {
        fail(`${item.id}: architectural invariant must block AI enablement`);
      }
      if (!/^AI-INV-\d+$/.test(item.id)) {
        fail(`${item.id}: architectural invariant id must match AI-INV-N`);
      }
    } else {
      governanceItems.push(item);
      if (item.blocks_ai_enable !== false) {
        fail(`${item.id}: governance/rodo/security condition must not be a hard architectural blocker`);
      }
    }
  }

  if (architecturalInvariants.length !== 5) {
    fail(`${LEDGER_PATH}: expected 5 architectural invariants, found ${architecturalInvariants.length}`);
  } else {
    pass(`${LEDGER_PATH}: contains 5 architectural invariants`);
  }

  for (const required of ["AI-GOV-1", "AI-GOV-2", "AI-RODO-1", "AI-SEC-1"]) {
    if (seen.has(required)) {
      pass(`${LEDGER_PATH}: required condition exists: ${required}`);
    } else {
      fail(`${LEDGER_PATH}: missing required condition: ${required}`);
    }
  }

  return { architecturalInvariants, governanceItems };
}

function determineAlert(architecturalInvariants, governanceItems) {
  const blockingInvariants = architecturalInvariants.filter((item) => !MET_STATUSES.has(item.status));
  if (blockingInvariants.length > 0) {
    return {
      level: "BLOCK",
      blockingInvariants,
      incompleteGovernance: governanceItems.filter((item) => !MET_STATUSES.has(item.status))
    };
  }

  const incompleteGovernance = governanceItems.filter((item) => !MET_STATUSES.has(item.status));
  if (incompleteGovernance.length > 0) {
    return { level: "WARNING", blockingInvariants: [], incompleteGovernance };
  }

  return { level: "GREEN", blockingInvariants: [], incompleteGovernance: [] };
}

function isAiEnabled() {
  return /^true$/i.test(String(process.env.AI_ENABLED || ""));
}

function main() {
  const ledger = readJson(LEDGER_PATH);
  if (!ledger) {
    process.exit(1);
  }

  const preconditions = checkLedgerShape(ledger);
  const { architecturalInvariants, governanceItems } = checkPreconditions(preconditions);
  const alert = determineAlert(architecturalInvariants, governanceItems);

  if (alert.level === "BLOCK") {
    warning(`AI readiness alert: BLOCK - AI enablement blocked by architectural invariants`);
    for (const item of alert.blockingInvariants) {
      console.warn(`WARNING ${item.id}: status=${item.status}; ${item.note}`);
    }
  } else if (alert.level === "WARNING") {
    warning(`AI readiness alert: WARNING - architectural invariants met, governance/RODO/security incomplete`);
    for (const item of alert.incompleteGovernance) {
      console.warn(`WARNING ${item.id}: status=${item.status}; ${item.note}`);
    }
  } else {
    pass("AI readiness alert: GREEN - all ledger preconditions are met or verified_runtime");
  }

  if (isAiEnabled() && alert.level === "BLOCK") {
    for (const item of alert.blockingInvariants) {
      fail(`AI_ENABLED=true but invariant ${item.id} is ${item.status}; AI cannot be enabled`);
    }
  } else if (isAiEnabled()) {
    info(`AI_ENABLED=true with alert=${alert.level}; this gate permits enablement only within the documented function scope`);
  } else {
    info(`AI_ENABLED is not true; alert=${alert.level} is reported without blocking dev/staging`);
  }

  if (failures > 0) {
    console.error(`FAIL ai-readiness-check: ${failures} failure(s), ${warnings} warning(s)`);
    process.exit(1);
  }

  console.log(`PASS ai-readiness-check: alert=${alert.level}, warnings=${warnings}`);
}

main();
