import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const edgePath = process.env.EDGE_PATH || "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const tmpDir = join(root, ".tmp");
const harnessPath = join(tmpDir, "website-v1-5-34-runtime-harness.html");

const requiredSections = [
  "start",
  "kim-jestesmy",
  "rotary",
  "czlonkostwo",
  "profil",
  "obszary",
  "kierunki",
  "aktualnosci",
  "galeria",
  "facebook-aktualnosci",
  "kontakt"
];

function harnessHtml(baseHref, pageHtml) {
  const srcdoc = pageHtml.replace("<head>", `<head><base href="${baseHref}">`);
  return `<!doctype html>
<html lang="pl">
<meta charset="utf-8">
<title>WEBSITE v1.5.34 runtime harness</title>
<body>
<pre id="result">PENDING</pre>
<iframe id="page" style="width:1200px;height:900px"></iframe>
<script>
const pageSrcdoc = ${JSON.stringify(srcdoc).replace(/<\/script/gi, "<\\/script")};
const requiredSections = ${JSON.stringify(requiredSections)};
let finished = false;
function finish(result) {
  if (finished) return;
  finished = true;
  document.getElementById("result").textContent = JSON.stringify(result);
}
function clickCheck(doc, selector) {
  const header = doc.querySelector(selector);
  if (!header) return { selector, ok: false, reason: "missing-header" };
  header.click();
  const panel = doc.getElementById(header.getAttribute("aria-controls"));
  return {
    selector,
    ok: header.getAttribute("aria-expanded") === "true" && panel && panel.getAttribute("aria-hidden") === "false",
    expanded: header.getAttribute("aria-expanded"),
    panelHidden: panel ? panel.getAttribute("aria-hidden") : "missing-panel"
  };
}
const frame = document.getElementById("page");
function inspectFrame() {
    try {
      const doc = frame.contentDocument;
      const text = doc.body ? doc.body.textContent : "";
      const fb = doc.querySelector('[data-social-link="facebook"]');
      const checks = {
        bodyHasContent: text.length > 2500,
        oneH1: doc.querySelectorAll("h1").length === 1,
        requiredSections: requiredSections.filter((id) => !!doc.getElementById(id)),
        noPlaylistPlaceholder: !text.includes("PLAYLIST_ID"),
        mottoOk: text.includes("Służba na rzecz innych ponad własną korzyść") && !text.includes("Służba ponad własny interes"),
        fourWayOfficial: [
          "Czy to jest prawda?",
          "Czy to jest uczciwe wobec wszystkich zainteresowanych?",
          "Czy to zbuduje dobrą wolę i przyjaźń?",
          "Czy będzie korzystne dla wszystkich zainteresowanych?"
        ].every((item) => text.includes(item)),
        facebookLink: !!fb && fb.getAttribute("target") === "_blank" && (fb.getAttribute("rel") || "").includes("noopener") && (fb.getAttribute("rel") || "").includes("noreferrer"),
        galleryAccordion: clickCheck(doc, ".gallery-card__header"),
        memberAccordion: clickCheck(doc, ".member-card__header"),
        fourWayAccordion: clickCheck(doc, ".four-way-card__header")
      };
      checks.allRequiredSections = checks.requiredSections.length === requiredSections.length;
      checks.pass = checks.bodyHasContent && checks.oneH1 && checks.allRequiredSections && checks.noPlaylistPlaceholder && checks.mottoOk && checks.fourWayOfficial && checks.facebookLink && checks.galleryAccordion.ok && checks.memberAccordion.ok && checks.fourWayAccordion.ok;
      finish(checks);
    } catch (error) {
      finish({ pass: false, error: String(error && error.message || error) });
    }
}
frame.srcdoc = pageSrcdoc;
setTimeout(inspectFrame, 2500);
setTimeout(() => finish({ pass: false, error: "timeout" }), 9000);
</script>`;
}

function runEdge(url, label) {
  if (!existsSync(edgePath)) {
    throw new Error(`Edge executable not found: ${edgePath}`);
  }
  const result = spawnSync(edgePath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--disable-extensions",
    `--user-data-dir=${join(tmpDir, "edge-runtime-profile-" + label + "-" + Date.now())}`,
    "--dump-dom",
    "--virtual-time-budget=11000",
    url
  ], {
    cwd: root,
    encoding: "utf8",
    timeout: 30000
  });
  const output = `${result.stdout || ""}\n${result.stderr || ""}`;
  const matches = Array.from(output.matchAll(/<pre id="result">([^<]+)<\/pre>/g));
  const match = matches[matches.length - 1];
  if (!match) {
    return { pass: false, exitCode: result.status, error: "missing-result", output: output.slice(-1200) };
  }
  if (match[1] === "PENDING") {
    return { pass: false, exitCode: result.status, error: "pending-result", output: output.slice(-1200) };
  }
  return { exitCode: result.status, ...JSON.parse(match[1].replace(/&quot;/g, "\"")) };
}

function contentType(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

function startServer() {
  return new Promise((resolveServer) => {
    const server = createServer((request, response) => {
      const url = new URL(request.url || "/", "http://127.0.0.1");
      const relative = decodeURIComponent(url.pathname === "/" ? "/index.html" : url.pathname);
      const filePath = join(root, relative.replace(/^\/+/, ""));
      if (!filePath.startsWith(root)) {
        response.writeHead(403).end("Forbidden");
        return;
      }
      try {
        response.writeHead(200, { "content-type": contentType(filePath) });
        response.end(readFileSync(filePath));
      } catch {
        response.writeHead(404).end("Not found");
      }
    });
    server.listen(0, "127.0.0.1", () => resolveServer(server));
  });
}

mkdirSync(tmpDir, { recursive: true });

const indexHtml = readFileSync(join(root, "index.html"), "utf8");
const fileBaseHref = pathToFileURL(root + "\\").href;
writeFileSync(harnessPath, harnessHtml(fileBaseHref, indexHtml), "utf8");
const fileResult = runEdge(pathToFileURL(harnessPath).href, "file");

const server = await startServer();
const port = server.address().port;
writeFileSync(harnessPath, harnessHtml(`http://127.0.0.1:${port}/`, indexHtml), "utf8");
const httpResult = runEdge(`http://127.0.0.1:${port}/.tmp/website-v1-5-34-runtime-harness.html`, "http");
server.close();

const result = {
  status: fileResult.pass && httpResult.pass ? "PASS" : "FAILED_RUNTIME",
  file: fileResult,
  http: httpResult
};

console.log(JSON.stringify(result, null, 2));
if (result.status !== "PASS") process.exit(1);
